import { InfluxDB } from '@influxdata/influxdb-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { start } from 'repl';
import { GlobalActivePower } from './power/GlobalActivePower';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { FieldResponse } from './power/FieldResponse';
import { AllFieldResponse } from './power/AllFieldResponse';
import { AllFieldsValue } from './power/AllFieldsValue';
import { workerData } from 'worker_threads';
import { Bulk } from './power/Bulk';

@Injectable()
export class PowerConsumptionService {

    public client: InfluxDB;
    constructor(
        private config: ConfigService,
    ) {
        const token: string = this.config.get("INFLUX_API_TOKEN")
        const url: string = this.config.get("INFLUX_URL")
        this.client = new InfluxDB({ url, token })
    }

    private verifyDates(startFrom: string, endAt: string): Boolean {
        const dateFrom = new Date(startFrom)
        const dateTo = endAt == null ? new Date(Date.now()) : new Date(endAt);

        if (isNaN(Date.parse(startFrom)) && startFrom != null) {
            return false
        }

        if (isNaN(Date.parse(endAt)) && endAt != null) {
            return false;
        }

        if (dateFrom >= dateTo) {
            return false;
        }

        return true;
    }

    public getFieldForPeriod(startFrom: string, endAt: string, field: string, subject: Subject<FieldResponse>) {
        if (field == null || field.length === 0) {
            subject.complete();
            return;
        }

        const dateFrom = new Date(startFrom)
        const dateTo = endAt == null ? new Date(Date.now()) : new Date(endAt);

        // if (isNaN(Date.parse(startFrom)) && startFrom != null) {
        //     subject.complete();
        //     return;
        // }

        // if (isNaN(Date.parse(endAt)) && endAt != null) {
        //     subject.complete();
        //     return;
        // }

        // if (dateFrom >= dateTo) {
        //     subject.complete();
        //     return;
        // }
        if (!this.verifyDates(startFrom, endAt)) {
            subject.complete();
            return;
        }

        const query =
            `from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${startFrom}, stop:${dateTo.toISOString()})
        |> filter(fn: (r)=>r._measurement=="${this.config.get("MEASUREMENT")}")
        |> filter(fn: (r)=> r._field=="${field}")
        `
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))

        return new Promise<any>((resolve, reject) => {

            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    subject.next({
                        measurement: tableObject._measurement,
                        field: tableObject._field,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        time: tableObject._time,
                        value: tableObject._value
                    })
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    subject.complete();
                    resolve('done');
                },
            });
        });
    }

    public getAllFieldsForPeriod(startFrom: string, endAt: string, subject: Subject<AllFieldResponse>) {
        const dateFrom = new Date(startFrom)
        const dateTo = endAt == null ? new Date(Date.now()) : new Date(endAt);

        if (!this.verifyDates(startFrom, endAt)) {
            subject.complete();
            return;
        }

        const query = `
            from(bucket: "${this.config.get("BUCKET")}")
            |> range(start: ${startFrom}, stop:${dateTo.toISOString()})
            |> filter(fn: (r) => r._measurement == "${this.config.get("MEASUREMENT")}")
            |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;

        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))

        return new Promise<any>((resolve, reject) => {

            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    subject.next({
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        time: tableObject._time,
                        globalActivePower: tableObject.Global_active_power,
                        globalIntensity: tableObject.Global_intensity,
                        globalReactivePower: tableObject.Global_reactive_power,
                        subMetering_1: tableObject.Sub_metering_1,
                        subMetering_2: tableObject.Sub_metering_2,
                        subMetering_3: tableObject.Sub_metering_3,
                        voltage: tableObject.Voltage
                    })
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    subject.complete();
                    resolve('done');
                },
            });
        });
    }

    public async addMeasurement(value: AllFieldsValue) {
        const writeApi = this.client.getWriteApi(this.config.get("ORGANIZATION"), this.config.get("BUCKET"), 'ms');
        const lineProtocol = `${this.config.get("MEASUREMENT")} Voltage=${value.voltage},Global_active_power=${value.globalActivePower},Global_intensity=${value.globalIntensity},Global_reactive_power=${value.globalReactivePower},Sub_metering_1=${value.subMetering_1},Sub_metering_2=${value.subMetering_2},Sub_metering_3=${value.subMetering_3} ${new Date(value.time).getTime()}`
        try {
            writeApi.writeRecord(lineProtocol);
        }
        catch (error) {
            throw (error);
        } finally {
            writeApi.close().then(() => {
                console.log('done')
            })
        }
    }

    public addBulkMeasurements(value: Bulk) {
        const writeApi = this.client.getWriteApi(this.config.get("ORGANIZATION"), this.config.get("BUCKET"), 'ms');
        try {

            const lineProtocol: string[] = [];
            value.value.forEach((allFields) => {
                lineProtocol.push(`${this.config.get("MEASUREMENT")} Voltage=${allFields.voltage},Global_active_power=${allFields.globalActivePower},Global_intensity=${allFields.globalIntensity},Global_reactive_power=${allFields.globalReactivePower},Sub_metering_1=${allFields.subMetering_1},Sub_metering_2=${allFields.subMetering_2},Sub_metering_3=${allFields.subMetering_3} ${new Date(allFields.time).getTime()}`)
            });


            writeApi.writeRecords(lineProtocol);
        }
        catch (error) {
            throw (error);
        } finally {
            writeApi.close().then(() => {
                console.log('done')
            })
        }
    }
}


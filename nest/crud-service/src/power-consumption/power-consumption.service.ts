import { InfluxDB, Point } from '@influxdata/influxdb-client';
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
import { UpdateField } from './power/UpdateField';
import { error } from 'console';
import { DeleteAPI, WriteAPI } from '@influxdata/influxdb-client-apis';
import { TimeStamp } from './power/TimeStamp';
import { Period } from './power/Period';
import { FieldPeriod } from './power/FieldPeriod';
import { AllFieldValueResponse } from './power/AllFieldValueResponse';
import { FieldValue } from './power/FieldValue';
import { UpdateFieldObject } from './power/UpdateFieldObject';

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

    public async addFieldToOutput(data: UpdateFieldObject) {
        if (isNaN(Date.parse(data.timeStamp))) {
            throw new error("Invalid date format")
        }
        const startRange = new Date(data.timeStamp).getTime() - 10;
        const endRange = new Date(data.timeStamp).getTime() + 10;

        const query =
            `from(bucket: "${this.config.get("BUCKET")}")
            |> range(start: ${new Date(startRange).toISOString()}, stop: ${new Date(endRange).toISOString()})
            |> filter(fn: (r)=>r._time==${new Date(data.timeStamp).toISOString()})
            |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
            |> set(key: "${data.field}", value: "${data.value}")`
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        try {
            return await queryClient.collectRows(query);
        }
        catch (error) {
            throw (error)
        }
    }

    public async updateField(data: UpdateFieldObject) {
        if (isNaN(Date.parse(data.timeStamp))) {
            throw new Error("Invalid date format")
        }
        const startRange = new Date(data.timeStamp).getTime() - 10;
        const endRange = new Date(data.timeStamp).getTime() + 10;
        const query =
            `from(bucket: "${this.config.get("BUCKET")}")
            |> range(start: ${new Date(startRange).toISOString()}, stop: ${new Date(endRange).toISOString()})
            |> filter(fn: (r)=> r._field=="${data.field}")
            |> filter(fn: (r)=>r._time==${new Date(data.timeStamp).toISOString()})`
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        const writeApi = this.client.getWriteApi(this.config.get("ORGANIZATION"), this.config.get("BUCKET"), 'ms');

        try {

            const rows = await queryClient.collectRows(query);
            if (rows.length == 0) {
                throw new Error('Row not found')
            }

            const point = new Point(this.config.get('MEASUREMENT'))
                .floatField(`${data.field}`, `${data.value}`)
                .timestamp(new Date(data.timeStamp))

            writeApi.writePoint(point);
        }
        catch (error) {
            throw (error)
        }
        finally {
            await writeApi.close();
        }
    }

    public async deleteTimestamp(data: TimeStamp) {
        if (isNaN(Date.parse(data.timeStamp))) {
            throw new Error("Invalid date format")
        }
        const startRange = new Date(data.timeStamp).getTime();
        const endRange = new Date(data.timeStamp).getTime();


        const deleteApi = new DeleteAPI(this.client);
        try {
            await deleteApi.postDelete({
                org: this.config.get("ORGANIZATION"),
                bucket: this.config.get("BUCKET"),
                body: {
                    start: new Date(startRange).toISOString(),
                    stop: new Date(endRange).toISOString(),
                    predicate: `_measurement="${this.config.get("MEASUREMENT")}"`,
                },
            })
        }
        catch (error) {
            throw (error)
        }
    }

    public async deleteRange(data: Period) {
        const dateFrom = new Date(data.from)
        const dateTo = data._to == null ? new Date(Date.now()) : new Date(data.to);

        if (!this.verifyDates(data.from, data.to)) {
            throw new Error("Invalid dates")
        }

        const deleteApi = new DeleteAPI(this.client);
        try {
            await deleteApi.postDelete({
                org: this.config.get("ORGANIZATION"),
                bucket: this.config.get("BUCKET"),
                body: {
                    start: dateFrom.toISOString(),
                    stop: dateTo.toISOString(),
                    predicate: `_measurement="${this.config.get("MEASUREMENT")}"`,
                },
            })
        }
        catch (error) {
            throw (error)
        }
    }


    async minFieldForPeriod(data: FieldPeriod): Promise<FieldResponse> {
        if (data.field == null || data.field.length === 0) {
            throw new Error("Invalid field")
        }

        const dateFrom = new Date(data.period.from)
        const dateTo = data.period.to == null ? new Date(Date.now()) : new Date(data.period.to);

        if (!this.verifyDates(data.period.from, data.period.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
          |> filter(fn: (r) => r["_measurement"] == "${this.config.get("MEASUREMENT")}")
          |> filter(fn: (r) => r["_field"] == "${data.field}")
          |> min()
      `;
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            const result: FieldResponse[] = [];
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        time: tableObject._time,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result[0]);
                },
            });
        });
    }

    async minAllFieldsForPeriod(data: Period): Promise<AllFieldValueResponse> {

        const dateFrom = new Date(data.from)
        const dateTo = data.to == null ? new Date(Date.now()) : new Date(data.to);

        if (!this.verifyDates(data.from, data.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
        |> filter(fn: (r) => r._measurement == "${this.config.get("MEASUREMENT")}")
        |> min()`;

        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            let result: AllFieldValueResponse = { responses: [] }
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.responses.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        time: tableObject._time,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result);
                },
            });
        });
    }

    async maxFieldForPeriod(data: FieldPeriod): Promise<FieldResponse> {
        if (data.field == null || data.field.length === 0) {
            throw new Error("Invalid field")
        }

        const dateFrom = new Date(data.period.from)
        const dateTo = data.period.to == null ? new Date(Date.now()) : new Date(data.period.to);

        if (!this.verifyDates(data.period.from, data.period.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
          |> filter(fn: (r) => r["_measurement"] == "${this.config.get("MEASUREMENT")}")
          |> filter(fn: (r) => r["_field"] == "${data.field}")
          |> max()
      `;
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            const result: FieldResponse[] = [];
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        time: tableObject._time,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result[0]);
                },
            });
        });
    }

    async maxAllFieldsForPeriod(data: Period): Promise<AllFieldValueResponse> {
        const dateFrom = new Date(data.from)
        const dateTo = data.to == null ? new Date(Date.now()) : new Date(data.to);

        if (!this.verifyDates(data.from, data.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
        |> filter(fn: (r) => r._measurement == "${this.config.get("MEASUREMENT")}")
        |> max()`;

        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            let result: AllFieldValueResponse = { responses: [] }
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.responses.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        time: tableObject._time,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result);
                },
            });
        });
    }

    async avgFieldForPeriod(data: FieldPeriod): Promise<FieldValue> {
        if (data.field == null || data.field.length === 0) {
            throw new Error("Invalid field")
        }

        const dateFrom = new Date(data.period.from)
        const dateTo = data.period.to == null ? new Date(Date.now()) : new Date(data.period.to);

        if (!this.verifyDates(data.period.from, data.period.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
          |> filter(fn: (r) => r["_measurement"] == "${this.config.get("MEASUREMENT")}")
          |> filter(fn: (r) => r["_field"] == "${data.field}")
          |> mean()
      `;
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            const result: FieldValue[] = [];
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result[0]);
                },
            });
        });
    }

    async avgAllFieldsForPeriod(data: Period): Promise<AllFieldValueResponse> {
        const dateFrom = new Date(data.from)
        const dateTo = data.to == null ? new Date(Date.now()) : new Date(data.to);

        if (!this.verifyDates(data.from, data.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
        |> filter(fn: (r) => r._measurement == "${this.config.get("MEASUREMENT")}")
        |> mean()`;

        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            let result: AllFieldValueResponse = { responses: [] }
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.responses.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result);
                },
            });
        });
    }

    async sumFieldForPeriod(data: FieldPeriod): Promise<FieldValue> {
        if (data.field == null || data.field.length === 0) {
            throw new Error("Invalid field")
        }

        const dateFrom = new Date(data.period.from)
        const dateTo = data.period.to == null ? new Date(Date.now()) : new Date(data.period.to);

        if (!this.verifyDates(data.period.from, data.period.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
          |> filter(fn: (r) => r["_measurement"] == "${this.config.get("MEASUREMENT")}")
          |> filter(fn: (r) => r["_field"] == "${data.field}")
          |> sum()
      `;
        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            const result: FieldValue[] = [];
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result[0]);
                },
            });
        });
    }

    async sumAllFieldsForPeriod(data: Period): Promise<AllFieldValueResponse> {
        const dateFrom = new Date(data.from)
        const dateTo = data.to == null ? new Date(Date.now()) : new Date(data.to);

        if (!this.verifyDates(data.from, data.to)) {
            throw new Error("Invalid date period")
        }

        const query = `
        from(bucket: "${this.config.get("BUCKET")}")
        |> range(start: ${dateFrom.toISOString()}, stop:${dateTo.toISOString()})
        |> filter(fn: (r) => r._measurement == "${this.config.get("MEASUREMENT")}")
        |> sum()`;

        const queryClient = this.client.getQueryApi(this.config.get("ORGANIZATION"))
        return new Promise<any>((resolve, reject) => {
            let result: AllFieldValueResponse = { responses: [] }
            queryClient.queryRows(query, {
                next: (row, tableMeta) => {
                    const tableObject = tableMeta.toObject(row);
                    result.responses.push({
                        field: tableObject._field,
                        measurement: tableObject._measurement,
                        start: tableObject._start,
                        stop: tableObject._stop,
                        value: tableObject._value
                    });
                },
                error: (error) => {
                    reject(error);
                },
                complete: () => {
                    resolve(result);
                },
            });
        });
    }
}


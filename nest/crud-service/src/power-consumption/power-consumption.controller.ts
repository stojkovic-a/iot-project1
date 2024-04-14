import { Controller, Get } from '@nestjs/common';
import { PowerConsumptionService } from './power-consumption.service';
import { GrpcMethod, GrpcStreamCall, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata, ServerDuplexStream, ServerUnaryCall } from "@grpc/grpc-js";
import { HeroById } from './power/HeroById';
import { Hero } from './power/Hero';
import { Resp } from './power/Resp';
import { Period } from './power/Period';
import { Observable, Subject, retry } from 'rxjs';
import { GlobalActivePower } from './power/GlobalActivePower';
import { FieldPeriod } from './power/FieldPeriod';
import { FieldResponse } from './power/FieldResponse';
import { AllFieldResponse } from './power/AllFieldResponse';
import { subscribe } from 'diagnostics_channel';
import { AllFieldsValue } from './power/AllFieldsValue';
import { ResponseCode } from './power/ResponseCode';
import { text } from 'stream/consumers';
import { Bulk } from './power/Bulk';
import { UpdateField } from './power/UpdateField';
import { TimeStamp } from './power/TimeStamp';
import { FieldValue } from './power/FieldValue';
import { AllFieldValueResponse } from './power/AllFieldValueResponse';

@Controller('power-consumption')
export class PowerConsumptionController {

    constructor(
        private readonly powerService: PowerConsumptionService
    ) { }

    // @Get('test')
    // async test() {
    //     console.log('aaa')
    //     const data = await this.powerService.test();
    //     return data;
    // }

    @GrpcMethod('PowerService', 'FindOne')
    findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): Period {
        console.log("stigo jedan");
        const test = { from: new Date(Date.now()).toISOString(), to: (new Date(Date.now())).toISOString() }
        if (data.b) {
            console.log('ima')
        } else {
            console.log('nema')
        }
        return test
    }

    @GrpcMethod('PowerService', 'GetFieldForPeriod')
    getFieldForPeriod(data: FieldPeriod, metadata: Metadata, call: ServerUnaryCall<any, any>): Observable<FieldResponse> {
        try {
            const subject = new Subject<FieldResponse>();
            this.powerService.getFieldForPeriod(data.period.from, data.period._to, data.field, subject)
            return subject.asObservable();
        }
        catch (error) {
            console.error(`Error executing the service`, error)
        }
    }

    @GrpcMethod('PowerService', 'GetAllFieldsForPeriod')
    getAllFieldsForPeriod(data: Period, metadata: Metadata, call: ServerUnaryCall<any, any>): Observable<AllFieldResponse> {
        try {
            const subject = new Subject<AllFieldResponse>();
            this.powerService.getAllFieldsForPeriod(data.from, data.to, subject);
            return subject.asObservable();
        }
        catch (error) {
            console.error(`Error executing the service`, error)
        }
    }

    @GrpcMethod('PowerService', 'AddMeasurement')
    async addMeasurement(data: AllFieldsValue, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<ResponseCode> {
        try {
            await this.powerService.addMeasurement(data);
            return {
                status: 200,
                text: "Successful write"
            }

        } catch (error) {
            console.error(`Error executing the service`, error);
            return {
                status: 400,
                text: "Something went wrong"
            }
        }
    }

    @GrpcStreamMethod('PowerService', 'AddMeasurements')
    addMeasurements(data: Observable<AllFieldsValue>, metadata: Metadata, call: ServerDuplexStream<any, any>): Observable<ResponseCode> {
        try {
            const subject = new Subject<ResponseCode>();

            const onNext = async allFieldsValue => {
                try {
                    await this.powerService.addMeasurement(allFieldsValue);
                    subject.next({
                        status: 200,
                        text: "Successful write"
                    })
                } catch (error) {
                    console.error(error)
                    subject.next({
                        status: 400,
                        text: "Failed write"
                    })
                }
            }

            const onComplete = () => subject.complete();

            data.subscribe({
                next: onNext,
                complete: onComplete
            });

            return subject.asObservable();

        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'AddBulkMeasurements')
    async addBulkMeasurements(data: Bulk, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<ResponseCode> {
        try {
            await this.powerService.addBulkMeasurements(data);
            return {
                status: 200,
                text: "Successful write"
            }
        } catch (error) {
            console.log(error)
            return {
                status: 400,
                text: "Something went wrong"
            }
        }
    }

    @GrpcMethod('PowerService', 'AddFieldToOutput')
    async addFieldToOutput(data: UpdateField, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<ResponseCode> {
        try {
            const row = await this.powerService.addFieldToOutput(data)
            console.log(row)
            return {
                status: 200,
                text: `${JSON.stringify(row[0])}`
            }
        } catch (error) {
            console.error(`Service faield:`, error)

            return {
                status: 400,
                text: 'Something went wrong'
            }
        }
    }

    @GrpcMethod('PowerService', 'UpdateField')
    async updateField(data: UpdateField, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<ResponseCode> {
        try {
            await this.powerService.updateField(data);
            return {
                status: 200,
                text: `Successful update`
            }
        } catch (error) {
            console.error(`Service failed:`, error)
            return {
                status: 400,
                text: 'Something went wrong'
            }
        }
    }

    @GrpcMethod('PowerService', 'DeleteTimestamp')
    async deleteTimestamp(data: TimeStamp, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<ResponseCode> {
        try {
            await this.powerService.deleteTimestamp(data);
            return {
                status: 200,
                text: 'Delete successful'
            }
        } catch (error) {
            console.error(error);
            return {
                status: 400,
                text: 'Something went wrong'
            }
        }
    }

    @GrpcMethod('PowerService', 'DeleteRange')
    async deleteRange(data: Period, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<ResponseCode> {
        try {
            await this.powerService.deleteRange(data);
            return {
                status: 200,
                text: "Successful delete"
            }
        } catch (error) {
            console.error(error);
            return {
                text: 'Something went wrong',
                status: 400
            }
        }
    }

    @GrpcMethod('PowerService', 'MinFieldForPeriod')
    async minFieldForPeriod(data: FieldPeriod, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<FieldResponse> {
        try {
            const result = await this.powerService.minFieldForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'MinAllFieldsForPeriod')
    async minAllFieldsForPeriod(data: Period, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<AllFieldValueResponse> {
        try {
            const result = await this.powerService.minAllFieldsForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'MaxFieldForPeriod')
    async maxFieldForPeriod(data: FieldPeriod, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<FieldResponse> {
        try {
            const result = await this.powerService.maxFieldForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'MaxAllFieldsForPeriod')
    async maxAllFieldsForPeriod(data: Period, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<AllFieldValueResponse> {
        try {
            const result = await this.powerService.maxAllFieldsForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'AvgFieldForPeriod')
    async avgFieldForPeriod(data: FieldPeriod, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<FieldValue> {
        try {
            const result = await this.powerService.avgFieldForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'AvgAllFieldsForPeriod')
    async avgAllFieldsForPeriod(data: Period, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<AllFieldValueResponse> {
        try {
            const result = await this.powerService.avgAllFieldsForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'SumFieldForPeriod')
    async sumFieldForPeriod(data: FieldPeriod, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<FieldValue> {
        try {
            const result = await this.powerService.sumFieldForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @GrpcMethod('PowerService', 'SumAllFieldsForPeriod')
    async sumAllFieldsForPeriod(data: Period, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<AllFieldValueResponse> {
        try {
            const result = await this.powerService.sumAllFieldsForPeriod(data);
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}


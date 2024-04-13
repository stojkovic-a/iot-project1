import { Controller, Get } from '@nestjs/common';
import { PowerConsumptionService } from './power-consumption.service';
import { GrpcMethod, GrpcStreamCall, GrpcStreamMethod } from '@nestjs/microservices';
import { Metadata, ServerDuplexStream, ServerUnaryCall } from "@grpc/grpc-js";
import { HeroById } from './power/HeroById';
import { Hero } from './power/Hero';
import { Resp } from './power/Resp';
import { Period } from './power/Period';
import { Observable, Subject } from 'rxjs';
import { GlobalActivePower } from './power/GlobalActivePower';
import { FieldPeriod } from './power/FieldPeriod';
import { FieldResponse } from './power/FieldResponse';
import { AllFieldResponse } from './power/AllFieldResponse';
import { subscribe } from 'diagnostics_channel';
import { AllFieldsValue } from './power/AllFieldsValue';
import { ResponseCode } from './power/ResponseCode';
import { text } from 'stream/consumers';
import { Bulk } from './power/Bulk';

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
}


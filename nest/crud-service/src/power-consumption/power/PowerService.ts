// Original file: src/power-consumption/power.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AllFieldResponse as _power_AllFieldResponse, AllFieldResponse__Output as _power_AllFieldResponse__Output } from '../power/AllFieldResponse';
import type { AllFieldsValue as _power_AllFieldsValue, AllFieldsValue__Output as _power_AllFieldsValue__Output } from '../power/AllFieldsValue';
import type { Bulk as _power_Bulk, Bulk__Output as _power_Bulk__Output } from '../power/Bulk';
import type { FieldPeriod as _power_FieldPeriod, FieldPeriod__Output as _power_FieldPeriod__Output } from '../power/FieldPeriod';
import type { FieldResponse as _power_FieldResponse, FieldResponse__Output as _power_FieldResponse__Output } from '../power/FieldResponse';
import type { HeroById as _power_HeroById, HeroById__Output as _power_HeroById__Output } from '../power/HeroById';
import type { Period as _power_Period, Period__Output as _power_Period__Output } from '../power/Period';
import type { ResponseCode as _power_ResponseCode, ResponseCode__Output as _power_ResponseCode__Output } from '../power/ResponseCode';

export interface PowerServiceClient extends grpc.Client {
  AddBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddBulkMeasurements(argument: _power_Bulk, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddBulkMeasurements(argument: _power_Bulk, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
  AddMeasurement(argument: _power_AllFieldsValue, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddMeasurement(argument: _power_AllFieldsValue, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddMeasurement(argument: _power_AllFieldsValue, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddMeasurement(argument: _power_AllFieldsValue, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addMeasurement(argument: _power_AllFieldsValue, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addMeasurement(argument: _power_AllFieldsValue, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addMeasurement(argument: _power_AllFieldsValue, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addMeasurement(argument: _power_AllFieldsValue, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
  AddMeasurements(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_power_AllFieldsValue, _power_ResponseCode__Output>;
  AddMeasurements(options?: grpc.CallOptions): grpc.ClientDuplexStream<_power_AllFieldsValue, _power_ResponseCode__Output>;
  addMeasurements(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_power_AllFieldsValue, _power_ResponseCode__Output>;
  addMeasurements(options?: grpc.CallOptions): grpc.ClientDuplexStream<_power_AllFieldsValue, _power_ResponseCode__Output>;
  
  FindOne(argument: _power_HeroById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _power_HeroById, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _power_HeroById, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _power_HeroById, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  
  GetAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_AllFieldResponse__Output>;
  GetAllFieldsForPeriod(argument: _power_Period, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_AllFieldResponse__Output>;
  getAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_AllFieldResponse__Output>;
  getAllFieldsForPeriod(argument: _power_Period, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_AllFieldResponse__Output>;
  
  GetFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_FieldResponse__Output>;
  GetFieldForPeriod(argument: _power_FieldPeriod, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_FieldResponse__Output>;
  getFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_FieldResponse__Output>;
  getFieldForPeriod(argument: _power_FieldPeriod, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_FieldResponse__Output>;
  
}

export interface PowerServiceHandlers extends grpc.UntypedServiceImplementation {
  AddBulkMeasurements: grpc.handleUnaryCall<_power_Bulk__Output, _power_ResponseCode>;
  
  AddMeasurement: grpc.handleUnaryCall<_power_AllFieldsValue__Output, _power_ResponseCode>;
  
  AddMeasurements: grpc.handleBidiStreamingCall<_power_AllFieldsValue__Output, _power_ResponseCode>;
  
  FindOne: grpc.handleUnaryCall<_power_HeroById__Output, _power_Period>;
  
  GetAllFieldsForPeriod: grpc.handleServerStreamingCall<_power_Period__Output, _power_AllFieldResponse>;
  
  GetFieldForPeriod: grpc.handleServerStreamingCall<_power_FieldPeriod__Output, _power_FieldResponse>;
  
}

export interface PowerServiceDefinition extends grpc.ServiceDefinition {
  AddBulkMeasurements: MethodDefinition<_power_Bulk, _power_ResponseCode, _power_Bulk__Output, _power_ResponseCode__Output>
  AddMeasurement: MethodDefinition<_power_AllFieldsValue, _power_ResponseCode, _power_AllFieldsValue__Output, _power_ResponseCode__Output>
  AddMeasurements: MethodDefinition<_power_AllFieldsValue, _power_ResponseCode, _power_AllFieldsValue__Output, _power_ResponseCode__Output>
  FindOne: MethodDefinition<_power_HeroById, _power_Period, _power_HeroById__Output, _power_Period__Output>
  GetAllFieldsForPeriod: MethodDefinition<_power_Period, _power_AllFieldResponse, _power_Period__Output, _power_AllFieldResponse__Output>
  GetFieldForPeriod: MethodDefinition<_power_FieldPeriod, _power_FieldResponse, _power_FieldPeriod__Output, _power_FieldResponse__Output>
}

// Original file: src/power-consumption/power.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AllFieldResponse as _power_AllFieldResponse, AllFieldResponse__Output as _power_AllFieldResponse__Output } from '../power/AllFieldResponse';
import type { AllFieldValueResponse as _power_AllFieldValueResponse, AllFieldValueResponse__Output as _power_AllFieldValueResponse__Output } from '../power/AllFieldValueResponse';
import type { AllFieldsValue as _power_AllFieldsValue, AllFieldsValue__Output as _power_AllFieldsValue__Output } from '../power/AllFieldsValue';
import type { Bulk as _power_Bulk, Bulk__Output as _power_Bulk__Output } from '../power/Bulk';
import type { FieldPeriod as _power_FieldPeriod, FieldPeriod__Output as _power_FieldPeriod__Output } from '../power/FieldPeriod';
import type { FieldResponse as _power_FieldResponse, FieldResponse__Output as _power_FieldResponse__Output } from '../power/FieldResponse';
import type { FieldValue as _power_FieldValue, FieldValue__Output as _power_FieldValue__Output } from '../power/FieldValue';
import type { HeroById as _power_HeroById, HeroById__Output as _power_HeroById__Output } from '../power/HeroById';
import type { Period as _power_Period, Period__Output as _power_Period__Output } from '../power/Period';
import type { ResponseCode as _power_ResponseCode, ResponseCode__Output as _power_ResponseCode__Output } from '../power/ResponseCode';
import type { TimeStamp as _power_TimeStamp, TimeStamp__Output as _power_TimeStamp__Output } from '../power/TimeStamp';
import type { UpdateField as _power_UpdateField, UpdateField__Output as _power_UpdateField__Output } from '../power/UpdateField';

export interface PowerServiceClient extends grpc.Client {
  AddBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddBulkMeasurements(argument: _power_Bulk, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddBulkMeasurements(argument: _power_Bulk, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addBulkMeasurements(argument: _power_Bulk, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
  AddFieldToOutput(argument: _power_UpdateField, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddFieldToOutput(argument: _power_UpdateField, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddFieldToOutput(argument: _power_UpdateField, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  AddFieldToOutput(argument: _power_UpdateField, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addFieldToOutput(argument: _power_UpdateField, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addFieldToOutput(argument: _power_UpdateField, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addFieldToOutput(argument: _power_UpdateField, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  addFieldToOutput(argument: _power_UpdateField, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
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
  
  AvgAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  AvgAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  AvgAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  AvgAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  avgAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  avgAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  avgAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  avgAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  
  AvgFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  AvgFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  AvgFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  AvgFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  avgFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  avgFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  avgFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  avgFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  
  DeleteRange(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  DeleteRange(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  DeleteRange(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  DeleteRange(argument: _power_Period, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteRange(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteRange(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteRange(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteRange(argument: _power_Period, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
  DeleteTimestamp(argument: _power_TimeStamp, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  DeleteTimestamp(argument: _power_TimeStamp, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  DeleteTimestamp(argument: _power_TimeStamp, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  DeleteTimestamp(argument: _power_TimeStamp, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteTimestamp(argument: _power_TimeStamp, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteTimestamp(argument: _power_TimeStamp, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteTimestamp(argument: _power_TimeStamp, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  deleteTimestamp(argument: _power_TimeStamp, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
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
  
  MaxAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  MaxAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  MaxAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  MaxAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  maxAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  maxAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  maxAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  maxAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  
  MaxFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  MaxFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  MaxFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  MaxFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  maxFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  maxFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  maxFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  maxFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  
  MinAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  MinAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  MinAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  MinAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  minAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  minAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  minAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  minAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  
  MinFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  MinFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  MinFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  MinFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  minFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  minFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  minFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  minFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldResponse__Output>): grpc.ClientUnaryCall;
  
  SumAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  SumAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  SumAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  SumAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  sumAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  sumAllFieldsForPeriod(argument: _power_Period, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  sumAllFieldsForPeriod(argument: _power_Period, options: grpc.CallOptions, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  sumAllFieldsForPeriod(argument: _power_Period, callback: grpc.requestCallback<_power_AllFieldValueResponse__Output>): grpc.ClientUnaryCall;
  
  SumFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  SumFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  SumFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  SumFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  sumFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  sumFieldForPeriod(argument: _power_FieldPeriod, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  sumFieldForPeriod(argument: _power_FieldPeriod, options: grpc.CallOptions, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  sumFieldForPeriod(argument: _power_FieldPeriod, callback: grpc.requestCallback<_power_FieldValue__Output>): grpc.ClientUnaryCall;
  
  UpdateField(argument: _power_UpdateField, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  UpdateField(argument: _power_UpdateField, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  UpdateField(argument: _power_UpdateField, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  UpdateField(argument: _power_UpdateField, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  updateField(argument: _power_UpdateField, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  updateField(argument: _power_UpdateField, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  updateField(argument: _power_UpdateField, options: grpc.CallOptions, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  updateField(argument: _power_UpdateField, callback: grpc.requestCallback<_power_ResponseCode__Output>): grpc.ClientUnaryCall;
  
}

export interface PowerServiceHandlers extends grpc.UntypedServiceImplementation {
  AddBulkMeasurements: grpc.handleUnaryCall<_power_Bulk__Output, _power_ResponseCode>;
  
  AddFieldToOutput: grpc.handleUnaryCall<_power_UpdateField__Output, _power_ResponseCode>;
  
  AddMeasurement: grpc.handleUnaryCall<_power_AllFieldsValue__Output, _power_ResponseCode>;
  
  AddMeasurements: grpc.handleBidiStreamingCall<_power_AllFieldsValue__Output, _power_ResponseCode>;
  
  AvgAllFieldsForPeriod: grpc.handleUnaryCall<_power_Period__Output, _power_AllFieldValueResponse>;
  
  AvgFieldForPeriod: grpc.handleUnaryCall<_power_FieldPeriod__Output, _power_FieldValue>;
  
  DeleteRange: grpc.handleUnaryCall<_power_Period__Output, _power_ResponseCode>;
  
  DeleteTimestamp: grpc.handleUnaryCall<_power_TimeStamp__Output, _power_ResponseCode>;
  
  FindOne: grpc.handleUnaryCall<_power_HeroById__Output, _power_Period>;
  
  GetAllFieldsForPeriod: grpc.handleServerStreamingCall<_power_Period__Output, _power_AllFieldResponse>;
  
  GetFieldForPeriod: grpc.handleServerStreamingCall<_power_FieldPeriod__Output, _power_FieldResponse>;
  
  MaxAllFieldsForPeriod: grpc.handleUnaryCall<_power_Period__Output, _power_AllFieldValueResponse>;
  
  MaxFieldForPeriod: grpc.handleUnaryCall<_power_FieldPeriod__Output, _power_FieldResponse>;
  
  MinAllFieldsForPeriod: grpc.handleUnaryCall<_power_Period__Output, _power_AllFieldValueResponse>;
  
  MinFieldForPeriod: grpc.handleUnaryCall<_power_FieldPeriod__Output, _power_FieldResponse>;
  
  SumAllFieldsForPeriod: grpc.handleUnaryCall<_power_Period__Output, _power_AllFieldValueResponse>;
  
  SumFieldForPeriod: grpc.handleUnaryCall<_power_FieldPeriod__Output, _power_FieldValue>;
  
  UpdateField: grpc.handleUnaryCall<_power_UpdateField__Output, _power_ResponseCode>;
  
}

export interface PowerServiceDefinition extends grpc.ServiceDefinition {
  AddBulkMeasurements: MethodDefinition<_power_Bulk, _power_ResponseCode, _power_Bulk__Output, _power_ResponseCode__Output>
  AddFieldToOutput: MethodDefinition<_power_UpdateField, _power_ResponseCode, _power_UpdateField__Output, _power_ResponseCode__Output>
  AddMeasurement: MethodDefinition<_power_AllFieldsValue, _power_ResponseCode, _power_AllFieldsValue__Output, _power_ResponseCode__Output>
  AddMeasurements: MethodDefinition<_power_AllFieldsValue, _power_ResponseCode, _power_AllFieldsValue__Output, _power_ResponseCode__Output>
  AvgAllFieldsForPeriod: MethodDefinition<_power_Period, _power_AllFieldValueResponse, _power_Period__Output, _power_AllFieldValueResponse__Output>
  AvgFieldForPeriod: MethodDefinition<_power_FieldPeriod, _power_FieldValue, _power_FieldPeriod__Output, _power_FieldValue__Output>
  DeleteRange: MethodDefinition<_power_Period, _power_ResponseCode, _power_Period__Output, _power_ResponseCode__Output>
  DeleteTimestamp: MethodDefinition<_power_TimeStamp, _power_ResponseCode, _power_TimeStamp__Output, _power_ResponseCode__Output>
  FindOne: MethodDefinition<_power_HeroById, _power_Period, _power_HeroById__Output, _power_Period__Output>
  GetAllFieldsForPeriod: MethodDefinition<_power_Period, _power_AllFieldResponse, _power_Period__Output, _power_AllFieldResponse__Output>
  GetFieldForPeriod: MethodDefinition<_power_FieldPeriod, _power_FieldResponse, _power_FieldPeriod__Output, _power_FieldResponse__Output>
  MaxAllFieldsForPeriod: MethodDefinition<_power_Period, _power_AllFieldValueResponse, _power_Period__Output, _power_AllFieldValueResponse__Output>
  MaxFieldForPeriod: MethodDefinition<_power_FieldPeriod, _power_FieldResponse, _power_FieldPeriod__Output, _power_FieldResponse__Output>
  MinAllFieldsForPeriod: MethodDefinition<_power_Period, _power_AllFieldValueResponse, _power_Period__Output, _power_AllFieldValueResponse__Output>
  MinFieldForPeriod: MethodDefinition<_power_FieldPeriod, _power_FieldResponse, _power_FieldPeriod__Output, _power_FieldResponse__Output>
  SumAllFieldsForPeriod: MethodDefinition<_power_Period, _power_AllFieldValueResponse, _power_Period__Output, _power_AllFieldValueResponse__Output>
  SumFieldForPeriod: MethodDefinition<_power_FieldPeriod, _power_FieldValue, _power_FieldPeriod__Output, _power_FieldValue__Output>
  UpdateField: MethodDefinition<_power_UpdateField, _power_ResponseCode, _power_UpdateField__Output, _power_ResponseCode__Output>
}

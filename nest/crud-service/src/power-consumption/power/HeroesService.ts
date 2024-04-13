// Original file: src/power-consumption/power.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GlobalActivePower as _power_GlobalActivePower, GlobalActivePower__Output as _power_GlobalActivePower__Output } from '../power/GlobalActivePower';
import type { HeroById as _power_HeroById, HeroById__Output as _power_HeroById__Output } from '../power/HeroById';
import type { Period as _power_Period, Period__Output as _power_Period__Output } from '../power/Period';

export interface HeroesServiceClient extends grpc.Client {
  FindOne(argument: _power_HeroById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _power_HeroById, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _power_HeroById, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _power_HeroById, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, metadata: grpc.Metadata, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, options: grpc.CallOptions, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  findOne(argument: _power_HeroById, callback: grpc.requestCallback<_power_Period__Output>): grpc.ClientUnaryCall;
  
  GetGlobalActivePower(argument: _power_Period, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_GlobalActivePower__Output>;
  GetGlobalActivePower(argument: _power_Period, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_GlobalActivePower__Output>;
  getGlobalActivePower(argument: _power_Period, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_GlobalActivePower__Output>;
  getGlobalActivePower(argument: _power_Period, options?: grpc.CallOptions): grpc.ClientReadableStream<_power_GlobalActivePower__Output>;
  
}

export interface HeroesServiceHandlers extends grpc.UntypedServiceImplementation {
  FindOne: grpc.handleUnaryCall<_power_HeroById__Output, _power_Period>;
  
  GetGlobalActivePower: grpc.handleServerStreamingCall<_power_Period__Output, _power_GlobalActivePower>;
  
}

export interface HeroesServiceDefinition extends grpc.ServiceDefinition {
  FindOne: MethodDefinition<_power_HeroById, _power_Period, _power_HeroById__Output, _power_Period__Output>
  GetGlobalActivePower: MethodDefinition<_power_Period, _power_GlobalActivePower, _power_Period__Output, _power_GlobalActivePower__Output>
}

import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PowerServiceClient as _power_PowerServiceClient, PowerServiceDefinition as _power_PowerServiceDefinition } from './power/PowerService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  power: {
    AllFieldResponse: MessageTypeDefinition
    AllFieldValueResponse: MessageTypeDefinition
    AllFieldsValue: MessageTypeDefinition
    Bulk: MessageTypeDefinition
    FieldPeriod: MessageTypeDefinition
    FieldResponse: MessageTypeDefinition
    FieldValue: MessageTypeDefinition
    HeroById: MessageTypeDefinition
    Period: MessageTypeDefinition
    PowerService: SubtypeConstructor<typeof grpc.Client, _power_PowerServiceClient> & { service: _power_PowerServiceDefinition }
    ResponseCode: MessageTypeDefinition
    TimeStamp: MessageTypeDefinition
    UpdateFieldObject: MessageTypeDefinition
  }
}


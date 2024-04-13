import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'power',
      protoPath: join(__dirname, './power-consumption/power.proto'),
      url:'localhost:3000'
    }
  });
  await app.listen();
}
bootstrap();

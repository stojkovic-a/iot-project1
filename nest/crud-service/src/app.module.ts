import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PowerConsumptionModule } from './power-consumption/power-consumption.module';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from './power-consumption/logger';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PowerConsumptionModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

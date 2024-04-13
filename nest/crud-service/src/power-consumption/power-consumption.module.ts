import { Module } from '@nestjs/common';
import { PowerConsumptionController } from './power-consumption.controller';
import { PowerConsumptionService } from './power-consumption.service';

@Module({
  controllers: [PowerConsumptionController],
  providers: [PowerConsumptionService]
})
export class PowerConsumptionModule {}

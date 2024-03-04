import { Module } from '@nestjs/common';
import { ForexService } from './forex.service';
import { ForexController } from './forex.controller';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports:[ScheduleModule.forRoot()],
  controllers: [ForexController],
  providers: [ForexService],
  exports:[ForexService]
})
export class ForexModule {}

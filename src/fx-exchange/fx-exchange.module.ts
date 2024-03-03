import { Module } from '@nestjs/common';
import { FxExchangeService } from './fx-exchange.service';
import { FxExchangeController } from './fx-exchange.controller';

@Module({
  controllers: [FxExchangeController],
  providers: [FxExchangeService],
})
export class FxExchangeModule {}

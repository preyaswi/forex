import { Module } from '@nestjs/common';
import { FxExchangeService } from './fx-exchange.service';
import { FxExchangeController } from './fx-exchange.controller';
import { AlphaVantage } from './alphavantage.co.service';
import { ForexService } from 'src/forex/forex.service';

@Module({
  controllers: [FxExchangeController],
  providers: [FxExchangeService,AlphaVantage,ForexService],
})
export class FxExchangeModule {}

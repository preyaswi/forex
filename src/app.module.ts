import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FxExchangeModule } from './fx-exchange/fx-exchange.module';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ForexModule } from './forex/forex.module';

@Module({
  imports: [FxExchangeModule, DbModule, UserModule, ForexModule],
  controllers: [AppController],
})
export class AppModule {}

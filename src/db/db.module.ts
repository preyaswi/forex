import { Global, Logger, Module } from '@nestjs/common';
import { DbService } from './db.service';
import Redis from 'ioredis';
import { CacheService } from './cache.service';

@Global()
@Module({
   providers: [DbService,CacheService   ],
   exports :[DbService,CacheService]
})
export class DbModule {}

import { Global, Logger, Module } from '@nestjs/common';
import { DbService } from './db.service';
import Redis from 'ioredis';
import { RedisRepository } from './redis-db-service';

@Global()
@Module({
   providers: [DbService,
      {
			provide: "RedisClient",
			useFactory: () => {
				const logger = new Logger("Redis");
				const redis = new Redis("rediss://default:55a340a9c5d84df9a871275e53208e18@eu1-ready-shad-38356.upstash.io:38356");
				redis.on("error", (err) => {
					throw new Error(`Redis connection failed: ${err}`);
				});
				redis.on("connect", () => {
					logger.log(`Redis connected successfully 🍒`);
				});
				return redis;
			},
			inject: []
		},
      RedisRepository
   ],
   exports :[DbService,RedisRepository]
})
export class DbModule {}

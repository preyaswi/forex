import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { CreateForexDto } from './dto/create-forex-dto';
import { CacheService } from 'src/db/cache.service';
import { randomInt, randomUUID } from 'node:crypto'
import { DbService } from 'src/db/db.service';
@Injectable()
export class ForexService {

    constructor(private readonly cacheService:CacheService,private readonly dbService:DbService) { }

    async fetchRate(createForexDto:CreateForexDto) {
      
        try {
            console.log(process.env.API_KEY);
            
            const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${createForexDto.fromCurrency}&to_currency=${createForexDto.toCurrency}&amount=${createForexDto.amount}&&apikey=${process.env.API_KEY!}`);
            const exchangeRateData = response.data['Realtime Currency Exchange Rate'];
            const rates=await this.dbService.exchangeRate.create({
            data:{
              fromCurrency: exchangeRateData['1. From_Currency Code'],
              toCurrency: exchangeRateData['3. To_Currency Code'],
              exchangeRate: parseFloat(exchangeRateData['5. Exchange Rate']),
              lastRefreshed: new Date(exchangeRateData['6. Last Refreshed']),
              bidPrice: parseFloat(exchangeRateData['8. Bid Price']),
              askPrice: parseFloat(exchangeRateData['9. Ask Price']),
            }
           })
            return response.data

        } catch (e) {
            console.error('Error in fetchRate:', e);
      throw new BadRequestException('Failed to fetch forex rate');     
        }
        
    }

    async fxRate() {
        try{
        const qouteId = this.generateQuoteId().toString()
        const expiry = moment().add(30, 'seconds');
         this.cacheService.set(qouteId,expiry,30)
        return {
          qouteId,
          expiry
        }
    }catch(e){
        console.error('Error in fxRate:', e);
        throw new BadRequestException('Failed to generate forex rate and quote ID');
    
    }
        
      }
    
      async convertRate(createForexDto:CreateForexDto) {
        try {
        const isExpired = await this.cacheService.get(createForexDto.qouteId)
        console.log(isExpired);
        
        if (!isExpired) {
          throw new BadRequestException('Quote ID has expired. Please request a new quote.')
        }
        return await this.fetchRate(createForexDto)
      }catch (error) {
        console.error('Error in convertRate:', error);
        throw new BadRequestException('Failed to convert forex rate');
      }
    }
      private generateQuoteId(): number {
        return randomInt(1000000)
      }
    }
    
    


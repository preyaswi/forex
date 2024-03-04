import { Injectable } from '@nestjs/common';
import axios from 'axios';
import moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class ForexService {

    constructor() { }

    async fetchRate(fromCurrency: string, toCurrency: string,amount:number) {
      
        try {
            console.log(process.env.API_KEY);
            
            const response = await axios.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&amount=${amount}&&apikey=${process.env.API_KEY!}`);
            return response.data

        } catch (e) {
            console.log(e);
            
        }
        
    }
    

}

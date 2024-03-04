import { Injectable } from "@nestjs/common";
import axios from 'axios'
@Injectable()
export class AlphaVantage {

    constructor() { }
    private url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=09XXVDGGSEGPIBI5'
    async updateRates() {
        const results = await axios.get(this.url)
        console.log(results.data);
        return results.data
        
    }
}
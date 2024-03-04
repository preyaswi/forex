import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFxExchangeDto } from './dto/create-fx-exchange.dto';
import { DbService } from 'src/db/db.service';
import { ForexService } from 'src/forex/forex.service';
import { randomInt, randomUUID } from 'node:crypto'
import * as moment from 'moment';
import { CacheService,  } from 'src/db/cache.service';
@Injectable()
export class FxExchangeService {
  constructor(private readonly db:DbService,private readonly forexService:ForexService,private readonly cacheService:CacheService){}
  async create(createFxExchangeDto: CreateFxExchangeDto) {
    let account = await this.db.accounts.findFirst({
      where: {
        UserId: createFxExchangeDto.userId
      }
    })

    if (!account) {
      account = await this.db.accounts.create({
        data: {
          user: {
            connect: {
             Id:createFxExchangeDto.userId
            }
          }
        }
      })
    } else {

      let currenyExist = await this.db.currency.findFirst({
        where: {
          AccountId: account.Id,
          Name:createFxExchangeDto.currency
        }
      })
      
      if (
        !currenyExist
      ) {
        currenyExist = await this.db.currency.create(
          {
            data: {
              Amount: createFxExchangeDto.amount,
              Name: createFxExchangeDto.currency,
              account: {
                connect: {
                  Id:account.Id
                }
              },
              user: {
                connect: {
                  Id:createFxExchangeDto.userId
                }
              }
            }
          }
        )
      } else {
        currenyExist = await this.db.currency.update(
          {
            where: {
              id:currenyExist.id
            },
            data: {
              Amount: {
                increment:createFxExchangeDto.amount
              }
            }
          }
        )
      }
      return currenyExist
    }

  }

 
  async findOne(id: number): Promise<{ balances: Record<string, number> }> {
    const user = await this.db.user.findFirst({
      where: {
        Id: id
      },
      include: {
        Accounts: {
          include: {
            Currency: true
          }
        },
      }
    });
  
    const balances: Record<string, number> = {};
  
    if (user?.Accounts) {
      for (const account of user.Accounts) {
        if (account.Currency) {
          for (const currency of account.Currency) {
            balances[currency.Name] = (balances[currency.Name] || 0) + currency.Amount;
          }
        }
      }
    }
  
    return { balances };
  }

  async fxRate() {
    const qouteId = this.generateQuoteId().toString()
    const expiry = moment().add(30, 'seconds');
     this.cacheService.set(qouteId,expiry,30)
    return {
      qouteId,
      expiry
    }
    
  }

  async convertRate(qouteId:string,fromCurrency: string, toCurrency: string, amount: number) {
    const isExpired = await this.cacheService.get(qouteId)
    console.log(isExpired);
    
    if (!isExpired) {
      throw new BadRequestException("Time Expired")
    }
    return await this.forexService.fetchRate(fromCurrency,toCurrency,amount)
  }
  

  private generateQuoteId(): number {
    return randomInt(1000000)
  }
}

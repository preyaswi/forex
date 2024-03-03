import { Injectable } from '@nestjs/common';
import { CreateFxExchangeDto } from './dto/create-fx-exchange.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FxExchangeService {
  constructor(private readonly db:DbService){}
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

  findAll() {
    return `This action returns all fxExchange`;
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
  
  update(id: number, updateFxExchangeDto: any) {
    return `This action updates a #${id} fxExchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} fxExchange`;
  }
}

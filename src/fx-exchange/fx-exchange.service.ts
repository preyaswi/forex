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

  findOne(id: number) {
    return `This action returns a #${id} fxExchange`;
  }

  update(id: number, updateFxExchangeDto: any) {
    return `This action updates a #${id} fxExchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} fxExchange`;
  }
}

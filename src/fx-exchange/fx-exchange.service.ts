import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFxExchangeDto } from './dto/create-fx-exchange.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class FxExchangeService {
  constructor(private readonly db:DbService){}
  async create(createFxExchangeDto: CreateFxExchangeDto) {
   try{ 
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
  }catch(error){
    console.error('Error in create method:', error);
      throw new BadRequestException('Error in create method');
  }

  }

 
  async findOne(id: number): Promise<{ balances: Record<string, number> }> {
    try{
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
  if(!user){
    throw new NotFoundException('User not found');
  }
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
  }catch(error){
    console.error('Error in findOne method:', error);
    throw new InternalServerErrorException('Error retrieving user balances');
  }
  }
}
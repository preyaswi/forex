import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private readonly db:DbService){}
  async create(createUserDto:CreateUserDto) {
    return await this.db.user.create({
      data: {
        Name:createUserDto.Name,
        Password:createUserDto.Password
      }
    })
  }

 async findAll() {
    return await this.db.user.findMany({})
  }

  async findOne(id: number) {
    return await this.db.user.findFirst({
      where: {
        Id:id
      },
      include: {
        Accounts: {
          include: {
            Currency:true
          }
        },
      }
    })
  }

}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto} from './dto/create-user.dto';
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

  async login(logindetail:LoginDto){
   const user=await this.db.user.findFirst({
    where:{
      Name:logindetail.Name,
      Password:logindetail.Password
      
    },
   })
  
   if (!user) {
    throw new BadRequestException("User not found. Please sign up.");
  } else if (user.Password !== logindetail.Password) {
    throw new BadRequestException("Incorrect password.");
  } else {
    return {userId:user.Id,message: "Signed in"};
  }
  }
}

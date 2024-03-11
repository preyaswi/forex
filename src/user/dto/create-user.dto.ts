import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto { 
    @ApiProperty({ example: 'prakash', description: 'User name', type: 'string',})
    Name    : string;
    @ApiProperty({example: 'password1',description: 'User password',type: 'string',})
    Password :string;
}
export class UserDto {
    @ApiProperty({example: 1,description: 'User ID',type: 'integer',})
    Id: number;
    @ApiProperty({example: 'latha',description: 'User name',type: 'string',})
    Name: string;
}    
export class LoginDto{
@IsNotEmpty()
 Name:string
 @IsNotEmpty()
 Password:string
}
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto { 
    @ApiProperty({ example: 'prakash', description: 'User name', type: 'string',})
    Name    : String;
    @ApiProperty({example: 'password1',description: 'User password',type: 'string',})
    Password :String;
}
export class UserDto {
    @ApiProperty({example: 1,description: 'User ID',type: 'integer',})
    Id: number;
    @ApiProperty({example: 'latha',description: 'User name',type: 'string',})
    Name: string;
}    
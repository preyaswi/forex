import { ApiProperty } from "@nestjs/swagger";

export class CreateFxExchangeDto  {
  @ApiProperty({ example: 'preya', description: 'User name' })
  amount: number;
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  currency: string;
  @ApiProperty({ example: 1, description: 'User ID' })
  userId:number
}

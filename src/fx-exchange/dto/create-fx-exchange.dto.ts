import { ApiProperty } from "@nestjs/swagger";

export class CreateFxExchangeDto  {
  @ApiProperty({ example: 200, description: 'the amount to exchange' ,type:'number'})
  amount: number;
  @ApiProperty({ example: 'USD', description: 'Currency code for the exchange',type:'string',minLength:3,maxLength:3 })
  currency: string;
  @ApiProperty({ example: 1, description: 'User ID initiating the exchange',type:'number' })
  userId:number
}
export class BalanceResponseDto {
  @ApiProperty({
    description: 'User balances',
    type: () => Object,
  })
  balances: Record<string, number>;
}
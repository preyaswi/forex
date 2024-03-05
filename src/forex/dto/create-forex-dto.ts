import { ApiProperty } from "@nestjs/swagger";

export class CreateForexDto{
    @ApiProperty({ example: 'abc123', description: 'Unique quote ID', type: 'string', })
    qouteId: string;
    @ApiProperty({ example: 'USD', description: 'Currency code for the source currency', type: 'string', minLength: 3, maxLength: 3, })
    fromCurrency: string;
    @ApiProperty({ example: 'EUR', description: 'Currency code for the target currency', type: 'string', minLength: 3, maxLength: 3, })
    toCurrency: string;
    @ApiProperty({ example: 100, description: 'Amount to exchange', type: 'number', })
    amount:number;
}
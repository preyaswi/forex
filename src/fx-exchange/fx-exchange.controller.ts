import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FxExchangeService } from './fx-exchange.service';
import { CreateFxExchangeDto } from './dto/create-fx-exchange.dto';
import { ApiTags } from '@nestjs/swagger';
import { AlphaVantage } from './alphavantage.co.service';

@ApiTags('account')
@Controller('account')
export class FxExchangeController {
  constructor(private readonly fxExchangeService: FxExchangeService,private readonly alphavantage:AlphaVantage) {}

  @Post('topup')
  async topup(@Body() createFxExchangeDto: CreateFxExchangeDto) {
    return this.fxExchangeService.create(createFxExchangeDto);
  }

  @Get('fx-rate')
  async fxRate() {
    return this.fxExchangeService.fxRate()
  }

  @Get("fx-conversion")
  async fxconversion(@Body() body:any) {
    return this.fxExchangeService.convertRate(body.qouteId,body.fromCurrency,body.toCurrency,body.amount)
  }
  

  @Get('balance/:id')
  async findOne(@Param('id') id: string) {
    return this.fxExchangeService.findOne(+id);
  }
  
}

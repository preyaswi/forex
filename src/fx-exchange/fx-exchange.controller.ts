import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { FxExchangeService } from './fx-exchange.service';
import { CreateFxExchangeDto } from './dto/create-fx-exchange.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('account')
export class FxExchangeController {
  constructor(private readonly fxExchangeService: FxExchangeService) {}

  @Post('topup')
  async topup(@Body() createFxExchangeDto: CreateFxExchangeDto) {
    return this.fxExchangeService.create(createFxExchangeDto);
  }

  @Get('balance/:id')
  async findOne(@Param('id') id: string) {
    return this.fxExchangeService.findOne(+id);
  }
  
}

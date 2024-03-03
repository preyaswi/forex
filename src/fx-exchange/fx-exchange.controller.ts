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

@Controller('account')
export class FxExchangeController {
  constructor(private readonly fxExchangeService: FxExchangeService) {}

  @Post('topup')
  topup(@Body() createFxExchangeDto: CreateFxExchangeDto) {
    return this.fxExchangeService.create(createFxExchangeDto);
  }

  @Get()
  findAll() {
    return this.fxExchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fxExchangeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFxExchangeDto: any) {
    return this.fxExchangeService.update(+id, updateFxExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fxExchangeService.remove(+id);
  }
}

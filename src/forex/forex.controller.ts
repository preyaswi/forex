import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ForexService } from './forex.service';
import { CreateForexDto } from './dto/create-forex-dto';

@Controller()
export class ForexController {
  constructor(private readonly forexService: ForexService) {}
  @Post('forex')
  async fetchRate(@Body() createForexdto: CreateForexDto) {
    return this.forexService.fetchRate(createForexdto);
  }

  @Get('fx-rate')
  async fxRate() {
    return this.forexService.fxRate()
  }

  @Get("fx-conversion")
  async fxconversion(@Body() createForexDto:CreateForexDto) {
    try {
      
      if (!createForexDto.qouteId) {
        throw new BadRequestException('quoteId is required in the request body');
      }

      return this.forexService.convertRate(createForexDto);
    } catch (error) {
      console.error('Error in fxconversion:', error);
      throw error;
    }
  }
  

}

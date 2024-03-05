import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ForexService } from './forex.service';
import { CreateForexDto } from './dto/create-forex-dto';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('forex-system')
@Controller()
export class ForexController {
  constructor(private readonly forexService: ForexService) {}
  @Post('forex')
  @ApiOperation({ summary: 'Fetch forex exchange rate' })
  @ApiBody({ type: CreateForexDto })
  @ApiResponse({ status: 200, description: 'Forex rate fetched successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async fetchRate(@Body() createForexdto: CreateForexDto) {
    return this.forexService.fetchRate(createForexdto);
  }

  @Get('fx-rate')
  @ApiOperation({ summary: 'Get forex rate and generate quote ID' })
  @ApiResponse({ status: 200, description: 'Forex rate and quote ID fetched successfully' })
  async fxRate() {
    return this.forexService.fxRate()
  }

  @Get("fx-conversion")
  @ApiOperation({ summary: 'Convert forex rate based on quote ID' })
  @ApiBody({ type: CreateForexDto })
  @ApiResponse({ status: 200, description: 'Forex conversion successful' })
  @ApiBadRequestResponse({ description: 'Bad request' }) 
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

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
    try {
    return this.forexService.fetchRate(createForexdto);
    }catch(error){
      console.error('Error in fetchRate:', error);
      throw new BadRequestException('Failed to fetch forex rate');
    }
  }

  @Get('fx-rate')
  @ApiOperation({ summary: 'Get forex rate and generate quote ID' })
  @ApiResponse({ status: 200, description: 'Forex rate and quote ID fetched successfully' })
  async fxRate() {
    try {
    return this.forexService.fxRate()
  } catch (error) {
    console.error('Error in fxRate:', error);
    throw new BadRequestException('Failed to generate forex rate and quote ID');
  }
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

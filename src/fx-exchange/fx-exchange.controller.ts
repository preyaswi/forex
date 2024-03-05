import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FxExchangeService } from './fx-exchange.service';
import { CreateFxExchangeDto } from './dto/create-fx-exchange.dto';
import { BalanceResponseDto } from './dto/create-fx-exchange.dto'
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('account')
export class FxExchangeController {
  constructor(private readonly fxExchangeService: FxExchangeService) {}

  @Post('topup')
  @ApiOperation({ summary: 'Top-up the user account with a specified amount' })
  @ApiBody({ type: CreateFxExchangeDto })
  @ApiCreatedResponse({
    description: 'Successfully topped up the user account',
    type: CreateFxExchangeDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async topup(@Body() createFxExchangeDto: CreateFxExchangeDto) {
    try {
      const result = await this.fxExchangeService.create(createFxExchangeDto);
      return result;
    } catch (error) {
      console.error('Error in topup:', error);
      throw new BadRequestException('Error in topup operation');
    }
  }

  @Get('balance/:id')
  @ApiOperation({ summary: 'Get account balance by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'User balance found', type:BalanceResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    try{
      const result = await this.fxExchangeService.findOne(+id);
      return result
    }catch(error){
      console.error('Error in findOne:', error);
    throw new NotFoundException('User not found');
    }
    
  }
  
}

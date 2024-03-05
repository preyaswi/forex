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
    return this.fxExchangeService.create(createFxExchangeDto);
  }

  @Get('balance/:id')
  @ApiOperation({ summary: 'Get account balance by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'User balance found', type:BalanceResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.fxExchangeService.findOne(+id);
  }
  
}

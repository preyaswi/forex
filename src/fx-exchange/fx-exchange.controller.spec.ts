import { Test, TestingModule } from '@nestjs/testing';
import { FxExchangeController } from './fx-exchange.controller';
import { FxExchangeService } from './fx-exchange.service';

describe('FxExchangeController', () => {
  let controller: FxExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxExchangeController],
      providers: [FxExchangeService],
    }).compile();

    controller = module.get<FxExchangeController>(FxExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

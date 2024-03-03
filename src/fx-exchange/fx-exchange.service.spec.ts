import { Test, TestingModule } from '@nestjs/testing';
import { FxExchangeService } from './fx-exchange.service';

describe('FxExchangeService', () => {
  let service: FxExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxExchangeService],
    }).compile();

    service = module.get<FxExchangeService>(FxExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

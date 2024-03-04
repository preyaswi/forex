import { Test, TestingModule } from '@nestjs/testing';
import { ForexController } from './forex.controller';
import { ForexService } from './forex.service';

describe('ForexController', () => {
  let controller: ForexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForexController],
      providers: [ForexService],
    }).compile();

    controller = module.get<ForexController>(ForexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

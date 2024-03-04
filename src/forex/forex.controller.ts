import { Controller } from '@nestjs/common';
import { ForexService } from './forex.service';

@Controller('forex')
export class ForexController {
  constructor(private readonly forexService: ForexService) {}
}

import { Controller, Get } from '@nestjs/common';
import { ParseUrlService } from './parse-url.service';

@Controller()
export class ParseUrlController {
  constructor(private readonly appService: ParseUrlService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

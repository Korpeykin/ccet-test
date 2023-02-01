import { Module } from '@nestjs/common';
import { ParseUrlController } from './parse-url.controller';
import { ParseUrlService } from './parse-url.service';

@Module({
  imports: [],
  controllers: [ParseUrlController],
  providers: [ParseUrlService],
})
export class ParseUrlModule {}

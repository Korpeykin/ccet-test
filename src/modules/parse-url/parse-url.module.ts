import { Module } from '@nestjs/common';
import { HttpApilModule } from '../../core/http/http-api,module';
import { ParseUrlController } from './parse-url.controller';
import { ParseUrlService } from './parse-url.service';

@Module({
  imports: [HttpApilModule],
  controllers: [ParseUrlController],
  providers: [ParseUrlService],
})
export class ParseUrlModule {}

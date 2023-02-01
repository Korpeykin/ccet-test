import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpApiService } from './http-api.service';

@Module({
  imports: [HttpModule],
  providers: [HttpApiService],
  exports: [HttpApiService],
})
export class HttpApilModule {}

import { Module } from '@nestjs/common';
import { ParseUrlModule } from './modules/parse-url/parse-url.module';

@Module({
  imports: [ParseUrlModule],
  controllers: [],
  providers: [],
})
export class MainModule {}

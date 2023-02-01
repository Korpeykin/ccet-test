import { Injectable } from '@nestjs/common';

@Injectable()
export class ParseUrlService {
  getHello(): string {
    return 'Hello World!';
  }
}

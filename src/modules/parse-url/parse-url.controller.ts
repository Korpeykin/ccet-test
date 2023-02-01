import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ParseUrlDto, ParseUrlResponse } from './dto/parse-url.dto';
import { ParseUrlService } from './parse-url.service';

@Controller('/parse-url')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('CCET test task')
export class ParseUrlController {
  constructor(private readonly parseUrlService: ParseUrlService) {}

  @Post()
  @ApiOkResponse({ type: () => ParseUrlResponse })
  public async parseUrl(@Body() { url }: ParseUrlDto) {
    const res = await this.parseUrlService.parseUrl(url);

    return new ParseUrlResponse(res);
  }
}

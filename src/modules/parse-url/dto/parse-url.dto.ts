import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ParseUrlDto {
  @ApiProperty()
  @IsUrl()
  public url: string;
}

export class ParseUrlResponse {
  constructor(data?: Partial<ParseUrlResponse>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @ApiProperty()
  public css: string[];

  @ApiProperty()
  public js: string[];
}

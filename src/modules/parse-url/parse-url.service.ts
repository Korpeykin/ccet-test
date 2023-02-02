import { Injectable } from '@nestjs/common';
import { HttpApiService } from '../../core/http/http-api.service';
import { getFromBetween } from '../../core/functions/get-from-between';
import { isURL } from 'class-validator';

@Injectable()
export class ParseUrlService {
  constructor(private readonly httpService: HttpApiService) {}

  public async parseUrl(url: string) {
    const data = await this.httpService.parseUrl(url);

    const jsTags = getFromBetween.get(data, '<script', '>').filter(Boolean);

    const cssTags = getFromBetween
      .get(data, '<link', '>')
      .filter((str) => str.includes('css'));

    return {
      css: this.processFiles(cssTags, 'href'),
      js: this.processFiles(jsTags, 'src'),
    };
  }

  protected processFiles(
    tags: string[],
    searchValue: 'src' | 'href',
  ): string[] {
    const res: string[] = [];

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];

      const file =
        getFromBetween.get(tag, `${searchValue}="`, '"')[0] ??
        getFromBetween.get(tag, `${searchValue}='`, `'`)[0];

      if (isURL(file)) {
        res.push(file);

        continue;
      }

      if (file) {
        res.push(file.split('/').pop());
      }
    }

    return res;
  }
}

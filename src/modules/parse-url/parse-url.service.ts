import { Injectable } from '@nestjs/common';
import { HttpApiService } from '../../core/http/http-api.service';
import * as extractUrls from 'extract-urls';
import { IGoodRoutes } from './interfaces/good-route.interface';

@Injectable()
export class ParseUrlService {
  constructor(private readonly httpService: HttpApiService) {}

  public async parseUrl(url: string) {
    const data = await this.httpService.parseUrl(url);

    const urls: string[] = extractUrls(data);

    const firstFilter = urls.filter((u) => this.isNeededRoute(u));

    const cssJsFiles = await Promise.allSettled<IGoodRoutes>(
      firstFilter.map(async (url) => {
        const contenType = await this.httpService.getFileContentType(url);

        if (this.isNeededRoute(contenType)) {
          return {
            url,
            contenType,
          };
        }

        throw 'Not Found!';
      }),
    );

    const res = {
      css: [],
      js: [],
    };

    for (let i = 0; i < cssJsFiles.length; i++) {
      const row = cssJsFiles[i];
      if (row.status === 'fulfilled') {
        if (row.value.contenType.includes('css')) {
          res.css.push(row.value.url);

          continue;
        }

        res.js.push(row.value.url);
      }
    }

    return res;
  }

  protected isNeededRoute(str: string): boolean {
    return (
      str.includes('css') || str.includes('javascript') || str.includes('js')
    );
  }
}

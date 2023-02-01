import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class HttpApiService {
  constructor(private readonly httpService: HttpService) {}

  public async parseUrl(url: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(url, {
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
          },
        })
        .pipe(
          catchError((e: AxiosError) => {
            throw new HttpException(e.message ?? 'Fetch files error', 500, {
              cause: new Error(e.message),
            });
          }),
        ),
    );

    return data;
  }

  public async getFileContentType(url: string) {
    const res = await firstValueFrom(
      this.httpService
        .get<string>(url, {
          timeout: 5000,
          headers: {
            'Accept-Encoding': 'gzip,deflate,compress',
          },
        })
        .pipe(
          catchError((e: AxiosError) => {
            throw new HttpException(e.message ?? 'Fetch files error', 500, {
              cause: new Error(e.message),
            });
          }),
        ),
    );

    return res.headers['content-type'];
  }
}

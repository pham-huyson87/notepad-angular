import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, from } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { ApiRetryException, delayedRetry } from 'src/app/core/custom-rxjs-operators/delay-retry';

@Injectable()
export class BaseApiService {

  private MAX_RETRIES             = 3;
  private DELAY_BETWEEN_RETRIES   = 3000;


  constructor(
    private _httpClient: HttpClient,
    private _servers: string[]
  ) {}


  protected async doApiCall(query: string, request: any): Promise<any> {

    return await this.doHttpPostRequest(
      this._servers,
      query,
      request
    )
  }


  // Inspired by : https://medium.com/angular-in-depth/retry-failed-http-requests-in-angular-f5959d486294
  private doHttpPostRequest(servers: string[], query: string, dataToSend: any = null): Promise<string> {

    const targetServer = servers[0];

    return this._httpClient.post<string>(
      `${targetServer}/${query}`,
      dataToSend
    )
    .pipe(
      delayedRetry(this.DELAY_BETWEEN_RETRIES, this.MAX_RETRIES, this._servers.length),
      catchError(async (exception: ApiRetryException) => {

        if (servers.length === 1)                   return EMPTY;
        if (exception === ApiRetryException.Stop)   return EMPTY;

        return from(
                  this.doHttpPostRequest(
                    servers.splice(1, servers.length),
                    query,
                    dataToSend
                  )
                );
      }),
      shareReplay()
    )
    .toPromise()

  }

}

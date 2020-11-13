import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, from } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { delayedRetry } from 'src/app/core/custom-rxjs-operators/delay-retry';

@Injectable()
export class BackendService {

  private API_URL__PRIMARY        = "https://127.0.0.1:5001";
  private API_URL__SECONDARY      = "https://127.0.0.1:5002";
  private MAX_RETRIES             = 3;
  private DELAY_BETWEEN_RETRIES   = 3000;


  constructor(
    private _httpClient: HttpClient
  ) {}


  public async doApiRequest(): Promise<any> {

    const servers = [
      this.API_URL__PRIMARY,
      this.API_URL__SECONDARY
    ];

    return await this.doHttpPostRequest(
      servers,
      "electric-vehicle/add",
      {
        name: 'Model S',
        color: 'red'
      }
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
      delayedRetry(this.DELAY_BETWEEN_RETRIES, this.MAX_RETRIES),
      catchError(async (a) => {

        if (servers.length === 1) return EMPTY;

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

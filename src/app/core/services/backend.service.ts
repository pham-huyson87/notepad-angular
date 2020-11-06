import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';

@Injectable()
export class BackendService {

  private API = "http://127.0.0.1:5000";

  constructor(
    private _httpClient: HttpClient
  ) {}

  public doSomething(): Observable<string> {
    return this._httpClient.get<string>(
      `${this.API}/do-something`
    )
    .pipe(
      retry(3),
      catchError(() => {
        return EMPTY
      }),
      shareReplay()
    )
  }
}

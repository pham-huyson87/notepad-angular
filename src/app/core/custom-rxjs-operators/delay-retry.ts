import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';


const MAX_RETRIES = 3;


export  function delayedRetry(delayMs: number, maxRetry = MAX_RETRIES, serversCount: number) {

  let remainingTries              = maxRetry;
  let remainingFallbackServers    = serversCount;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayMs),
        mergeMap((error) => {

          remainingTries--;

          if (remainingTries > 0)         return of(error)

          remainingTries = maxRetry;
          remainingFallbackServers--;

          const hasFallbackServersLeft  = remainingFallbackServers > 0;
          const lastTry                 = remainingFallbackServers === 0;

          if (hasFallbackServersLeft)   return of(error);
          if (lastTry)                  return throwError(ApiRetryException.Stop);
        })
      ))
    );
}

export enum ApiRetryException {
  Unknown = 0,
  Retry = 1,
  Stop = 2
}

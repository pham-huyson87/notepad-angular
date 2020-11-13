import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';


const MAX_RETRIES = 3;

const getErrorMessage = (maxRetry: number) =>
  `Tried to load Resource over XHR for ${maxRetry} times without success.`;


export  function delayedRetry(delayMs: number, maxRetry = MAX_RETRIES) {

  let retries = maxRetry;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayMs),
        mergeMap((error) => {

          retries--;

          if (retries > 0)  return of(error)

          return throwError(getErrorMessage(maxRetry));

        })
      ))
    );
}

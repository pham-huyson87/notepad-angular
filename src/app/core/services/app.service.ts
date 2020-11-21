import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AppService {

  private isProcessing        = new BehaviorSubject(false);

  public getIsProcessing      = (): boolean               => this.isProcessing.getValue()
  private setAsProcessing     = (): void                  => this.isProcessing.next(true)
  private setAsProcessed      = (): void                  => this.isProcessing.next(false)
  public observeIsProcessing  = (): Observable<boolean>   => this.isProcessing.asObservable()


  public async doProcess(process: () => Promise<any>): Promise<any>
  {
      try
      {
        this.setAsProcessing();

        return await process();
      }
      catch (error) {

      } finally {
        this.setAsProcessed();
      }
  }

}

import { Component, OnInit } from '@angular/core';
import { AppService } from './core/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  public vm = new AppCompomentViewModel();


  constructor(
    private _appService: AppService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.initialize();
  }


  private async initialize() {

    this.observeAppEvents();

    const result =
      await this._appService.doProcess(
                                        () => this.simulateAsyncLoading(5)
                                      );
  }

  private simulateAsyncLoading(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
  }

  private observeAppEvents() {
    this._appService
            .observeIsProcessing()
                .subscribe(
                  (isProcessing: boolean) => this.vm.isProcessing = isProcessing
                );
  }
}



export class AppCompomentViewModel {
  public isProcessing: boolean = false;
}

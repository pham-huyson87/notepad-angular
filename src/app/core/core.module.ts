import { NgModule } from '@angular/core';

import { BackendService } from 'src/app/core/services/backend.service';

@NgModule({
  providers: [
    BackendService
  ]
})
export class CoreModule { }

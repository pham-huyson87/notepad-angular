import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BackendService } from 'src/app/core/services/backend.service';

@NgModule({
  providers: [
    BackendService
  ],
  imports: [
    HttpClientModule
  ]
})
export class CoreModule { }

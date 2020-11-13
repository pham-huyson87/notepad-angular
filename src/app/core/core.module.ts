import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BaseApiService } from 'src/app/core/services/base-api.service';
import { CarService } from 'src/app/core/services/api.service';


@NgModule({
  providers: [
    BaseApiService,
    CarService
  ],
  imports: [
    HttpClientModule
  ]
})
export class CoreModule { }

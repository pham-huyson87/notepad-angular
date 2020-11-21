import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppService } from 'src/app/core/services/app.service';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { CarService } from 'src/app/core/services/api.service';


@NgModule({
  providers: [
    AppService,
    BaseApiService,
    CarService
  ],
  imports: [
    HttpClientModule
  ]
})
export class CoreModule { }

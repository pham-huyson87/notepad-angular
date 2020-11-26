import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgxSpinnerModule } from "ngx-spinner";

import { AppService } from 'src/app/core/services/app.service';
import { BaseApiService } from 'src/app/core/services/base-api.service';
import { CarService } from 'src/app/core/services/car.service';


@NgModule({
  providers: [
    AppService,
    BaseApiService,
    CarService
  ],
  imports: [
    HttpClientModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CoreModule { }

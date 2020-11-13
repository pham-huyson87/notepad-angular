import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApiService } from 'src/app/core/services/base-api.service';

import { AddCarRequest, AddCarResponse } from 'src/app/shared/dtos'


@Injectable()
export class CarService extends BaseApiService {

  constructor(
      private _http: HttpClient
  ) {
      super(
          _http,
          [
              "http://127.0.0.1:5000",
              "https://127.0.0.1:5001"
          ]
      );
  }

  public async addCar(request: AddCarRequest): Promise<AddCarResponse> {
    return this.doApiCall("add", request);
  }

}

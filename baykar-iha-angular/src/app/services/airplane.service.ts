import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../constants/apiConstant';
import { ListResponseModel } from '../models/request/listResponseModel';
import { Airplane } from '../models/entities/airplane';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  apiUrl = `${ApiConstant.root}/inventory/airplanes`;
  constructor(private httpClient: HttpClient) {}

  getAirplanes(): Observable<ListResponseModel<Airplane>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<Airplane>>(fullUrl);
  }
}

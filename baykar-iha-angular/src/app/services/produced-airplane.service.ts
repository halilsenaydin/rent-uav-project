import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../constants/apiConstant';
import { ListResponseModel } from '../models/request/listResponseModel';
import { ProducedAirplane } from '../models/entities/producedAirplane';
import { ResponseModel } from '../models/request/responseModel';
import { ProducedAirplaneDto } from '../models/dtos/producedAirplaneDto';

@Injectable({
  providedIn: 'root',
})
export class ProducedAirplaneService {
  apiUrl = `${ApiConstant.root}/inventory/produced-airplanes/`;
  constructor(private httpClient: HttpClient) {}

  getProducedAirplanes(): Observable<ListResponseModel<ProducedAirplaneDto>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<ProducedAirplaneDto>>(fullUrl);
  }

  create(entity: ProducedAirplane): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.post<ResponseModel>(fullUrl, entity);
  }

  update(id: number, entity: ProducedAirplane): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}${id}`;
    return this.httpClient.put<ResponseModel>(fullUrl, entity);
  }

  delete(id: number): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}${id}`;
    return this.httpClient.get<ResponseModel>(fullUrl);
  }

  dtoToEntity(original: ProducedAirplaneDto): ProducedAirplane {
    return {
      model: original.model.id,
      parts: original.parts.map((part) => part.id),
      producedDate: original.producedDate,
      status: original.status,
    };
  }
}

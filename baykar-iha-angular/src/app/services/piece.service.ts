import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../constants/apiConstant';
import { ListResponseModel } from '../models/request/listResponseModel';
import { Piece } from '../models/entities/piece';

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  apiUrl = `${ApiConstant.root}/inventory/pieces`;
  constructor(private httpClient: HttpClient) {}

  getPieces(): Observable<ListResponseModel<Piece>> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<ListResponseModel<Piece>>(fullUrl);
  }
}

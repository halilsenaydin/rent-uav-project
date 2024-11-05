import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../constants/apiConstant';
import { ListResponseModel } from '../models/request/listResponseModel';
import { ProducedPiece } from '../models/entities/producedPiece';
import { ProducedPieceDto } from '../models/dtos/producedPieceDto';
import { ResponseModel } from '../models/request/responseModel';
import { SingleResponseModel } from '../models/request/singleResponseModel';
import { FindAndCount } from '../models/request/findAndCount';

@Injectable({
  providedIn: 'root',
})
export class ProducedPieceService {
  apiUrl = `${ApiConstant.root}/inventory/produced-pieces/`;
  constructor(private httpClient: HttpClient) {}

  getProducedPieces(): Observable<
    SingleResponseModel<FindAndCount<ProducedPieceDto>>
  > {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.get<
      SingleResponseModel<FindAndCount<ProducedPieceDto>>
    >(fullUrl);
  }

  getProducedPiecesByTeamId(
    teamId: number
  ): Observable<SingleResponseModel<FindAndCount<ProducedPieceDto>>> {
    let fullUrl = `${this.apiUrl}team/${teamId}`;
    return this.httpClient.get<
      SingleResponseModel<FindAndCount<ProducedPieceDto>>
    >(fullUrl);
  }

  countProducedPiecesStockByModel(): Observable<SingleResponseModel<any>> {
    let fullUrl = `${this.apiUrl}stock`;
    return this.httpClient.get<SingleResponseModel<any>>(fullUrl);
  }

  create(entity: ProducedPiece): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}`;
    return this.httpClient.post<ResponseModel>(fullUrl, entity);
  }

  update(id: number, entity: ProducedPiece): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}${id}`;
    return this.httpClient.put<ResponseModel>(fullUrl, entity);
  }

  delete(id: number): Observable<ResponseModel> {
    let fullUrl = `${this.apiUrl}${id}`;
    return this.httpClient.delete<ResponseModel>(fullUrl);
  }

  dtoToEntity(original: ProducedPieceDto): ProducedPiece {
    return {
      airplane: original.airplane.id,
      piece: original.piece.id,
      team: original.team.id,
      producedDate: original.producedDate,
      status: original.status,
    };
  }
}

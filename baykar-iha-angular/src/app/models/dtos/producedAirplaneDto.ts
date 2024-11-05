import { Airplane } from '../entities/airplane';
import { ProducedPieceDto } from './producedPieceDto';

export interface ProducedAirplaneDto {
  id?: number;
  model?: Airplane;
  parts?: ProducedPieceDto[];
  producedDate?: Date;
  status?: boolean;
}

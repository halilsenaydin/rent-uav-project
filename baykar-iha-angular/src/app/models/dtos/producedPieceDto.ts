import { Airplane } from '../entities/airplane';
import { Piece } from '../entities/piece';
import { Team } from '../entities/team';

export interface ProducedPieceDto {
  id?: number;
  team?: Team;
  piece?: Piece;
  airplane?: Airplane;
  producedDate?: Date;
  status?: boolean;
}

import { Pipe, PipeTransform } from '@angular/core';
import { ProducedPieceDto } from '../models/dtos/producedPieceDto';

@Pipe({
  name: 'filterByProducedPiece',
  standalone: true,
})
export class FilterByProducedPiecePipe implements PipeTransform {
  transform(
    value: ProducedPieceDto[],
    filterTextModel?: string
  ): ProducedPieceDto[] {
    if (!value) return [];

    filterTextModel = filterTextModel
      ? filterTextModel.toLocaleLowerCase()
      : '';

    return value.filter((producedPiece: ProducedPieceDto) => {
      const matchesModel = filterTextModel
        ? producedPiece.airplane.name
            .toLocaleLowerCase()
            .includes(filterTextModel)
        : true;

      return matchesModel;
    });
  }
}

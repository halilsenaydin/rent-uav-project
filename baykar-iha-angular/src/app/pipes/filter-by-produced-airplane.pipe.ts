import { Pipe, PipeTransform } from '@angular/core';
import { ProducedAirplaneDto } from '../models/dtos/producedAirplaneDto';

@Pipe({
  name: 'filterByProducedAirplane',
  standalone: true,
})
export class FilterByProducedAirplanePipe implements PipeTransform {
  transform(
    value: ProducedAirplaneDto[] | null | undefined,
    filterText: string = ''
  ): ProducedAirplaneDto[] {
    if (!value) {
      return [];
    }

    filterText = filterText.toLocaleLowerCase();
    return filterText
      ? value.filter((p: ProducedAirplaneDto) =>
          p.model.name.toLocaleLowerCase().includes(filterText)
        )
      : value;
  }
}

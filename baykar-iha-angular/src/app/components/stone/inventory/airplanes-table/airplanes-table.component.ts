import { Component, Input } from '@angular/core';
import { Airplane } from '../../../../models/entities/airplane';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airplanes-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airplanes-table.component.html',
  styleUrl: './airplanes-table.component.css',
})
export class AirplanesTableComponent {
  @Input() data: Airplane[];
}

import { Component, Input } from '@angular/core';
import { Piece } from '../../../../models/entities/piece';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pieces-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pieces-table.component.html',
  styleUrl: './pieces-table.component.css',
})
export class PiecesTableComponent {
  @Input() data: Piece[];
}

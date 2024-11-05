import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterByProducedPiecePipe } from '../../../../pipes/filter-by-produced-piece.pipe';
import { AirplaneService } from '../../../../services/airplane.service';
import { PieceService } from '../../../../services/piece.service';
import { Airplane } from '../../../../models/entities/airplane';
import { Piece } from '../../../../models/entities/piece';
import { ProducedPieceDto } from '../../../../models/dtos/producedPieceDto';
import { ProducedPieceService } from '../../../../services/produced-piece.service';
import { AlertifyService } from '../../../../services/alertify.service';

@Component({
  selector: 'app-produced-pieces-table',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterByProducedPiecePipe],
  templateUrl: './produced-pieces-table.component.html',
  styleUrl: './produced-pieces-table.component.css',
})
export class ProducedPiecesTableComponent {
  @Input() data: ProducedPieceDto[];
  @Input() stock: number;
  @Input() total: number;

  constructor(
    private alertifyService: AlertifyService,
    private airplaneService: AirplaneService,
    private piecesService: PieceService,
    private producedPieceService: ProducedPieceService
  ) {}

  filterTextForModel: string = '';
  airplanes: Airplane[] = [];
  pieces: Piece[] = [];

  ngOnInit(): void {
    this.getAirplanes();
    this.getPieces();
  }

  getAirplanes() {
    this.airplaneService.getAirplanes().subscribe((response) => {
      this.airplanes = response.data;
    });
  }

  getPieces() {
    this.piecesService.getPieces().subscribe((response) => {
      this.pieces = response.data;
    });
  }

  updatePiece(producedPiece: ProducedPieceDto) {
    let entity = this.producedPieceService.dtoToEntity(producedPiece);
    this.producedPieceService.update(producedPiece.id, entity).subscribe(
      (response) => {
        if (response.success) {
          this.alertifyService.success(response.message);
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error) => {
        this.alertifyService.alert('Hata', error.error.message);
      }
    );
  }

  deletePiece(id: number) {
    this.producedPieceService.delete(id).subscribe(
      (response) => {
        if (response.success) {
          this.data = this.data.filter((piece) => piece.id !== id);
          this.alertifyService.success(response.message);
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error) => {
        this.alertifyService.alert('Hata', error.error.message);
      }
    );
  }
}

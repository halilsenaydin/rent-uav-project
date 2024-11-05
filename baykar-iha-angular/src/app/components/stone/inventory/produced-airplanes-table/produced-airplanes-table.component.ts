import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterByProducedAirplanePipe } from '../../../../pipes/filter-by-produced-airplane.pipe';
import { ProducedPieceService } from '../../../../services/produced-piece.service';
import { ProducedAirplaneService } from '../../../../services/produced-airplane.service';
import { AirplaneService } from '../../../../services/airplane.service';
import { Airplane } from '../../../../models/entities/airplane';
import { AlertifyService } from '../../../../services/alertify.service';
import { ProducedPieceDto } from '../../../../models/dtos/producedPieceDto';
import { ProducedAirplaneDto } from '../../../../models/dtos/producedAirplaneDto';

@Component({
  selector: 'app-produced-airplanes-table',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterByProducedAirplanePipe],
  templateUrl: './produced-airplanes-table.component.html',
  styleUrls: ['./produced-airplanes-table.component.css'],
})
export class ProducedAirplanesTableComponent implements OnInit {
  @Input() data: ProducedAirplaneDto[] | null = null;

  filterText: string = '';
  showPartInput: boolean = false;
  selectedPart: any;
  producedPieces: ProducedPieceDto[] = [];
  airplanes: Airplane[] = [];

  constructor(
    private alertifyService: AlertifyService,
    private producedPieceService: ProducedPieceService,
    private producedAirplaneService: ProducedAirplaneService,
    private airplaneService: AirplaneService
  ) {}

  ngOnInit(): void {
    this.getProducedPieces();
    this.getAirplanes();
  }

  getAirplanes() {
    this.airplaneService.getAirplanes().subscribe((response) => {
      this.airplanes = response.data;
    });
  }

  getProducedPieces() {
    this.producedPieceService.getProducedPieces().subscribe((response) => {
      this.producedPieces = response.data.rows;
    });
  }

  updateAirplane(producedAirplane: ProducedAirplaneDto) {
    let entity = this.producedAirplaneService.dtoToEntity(producedAirplane);
    this.producedAirplaneService.update(producedAirplane.id, entity).subscribe(
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

  deleteAirplane(airplaneId: number) {
    this.producedAirplaneService.delete(airplaneId).subscribe(
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

  deletePart(airplaneId: number, partIndex: number) {
    const airplane = this.data.find((a) => a.id === airplaneId);
    if (airplane && airplane.parts) {
      airplane.parts.splice(partIndex, 1);
      this.alertifyService.warning(
        `Parça Montajı Kaldırıldı: ${airplane.parts[partIndex].piece.name}`
      );
    }
  }

  addPartToAirplane(airplaneId: number, part: ProducedPieceDto) {
    const airplane = this.data.find((a) => a.id === airplaneId);
    if (airplane && part) {
      airplane.parts.push(part);
      this.selectedPart = null;
      this.showPartInput = false;
    }
  }
}

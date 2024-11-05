import { Component, OnInit } from '@angular/core';
import { Airplane } from '../../../models/entities/airplane';
import { AirplaneService } from '../../../services/airplane.service';
import { PieceService } from '../../../services/piece.service';
import { Piece } from '../../../models/entities/piece';
import { ProducedPieceService } from '../../../services/produced-piece.service';
import { AlertifyService } from '../../../services/alertify.service';
import { ProducedAirplane } from '../../../models/entities/producedAirplane';
import { CommonModule } from '@angular/common';
import { ProducedPiece } from '../../../models/entities/producedPiece';
import { ProducedPieceDto } from '../../../models/dtos/producedPieceDto';
import { ProducedAirplaneService } from '../../../services/produced-airplane.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/entities/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-produce-airplane',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produce-airplane.component.html',
  styleUrl: './produce-airplane.component.css',
})
export class ProduceAirplaneComponent {
  newAirplane: ProducedAirplane = {
    model: null,
    parts: [],
    producedDate: new Date(),
    status: true,
  };

  user: User;
  airplanes: Airplane[] = [];
  producedPieces: ProducedPieceDto[] = [];
  alert: string = null;

  constructor(
    private alertifyService: AlertifyService,
    private producedPieceService: ProducedPieceService,
    private airplaneService: AirplaneService,
    private producedAirplaneService: ProducedAirplaneService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAirplanes();
    this.getProducedPieces();
    this.getUser();
  }

  getUser() {
    let username = this.userService.getUserNameFromLocalStorage();
    this.userService.getUser(username).subscribe((response) => {
      if (response.success) {
        this.user = response.data;
        this.userAuthenticated();
      }
    });
  }

  getAirplanes() {
    this.airplaneService.getAirplanes().subscribe((response) => {
      if (response.success) {
        this.airplanes = response.data;
      }
    });
  }

  getProducedPieces() {
    this.producedPieceService.getProducedPieces().subscribe((response) => {
      if (response.success) {
        this.producedPieces = response.data.rows;
      }
    });
  }

  addAirplane() {
    this.producedAirplaneService.create(this.newAirplane).subscribe(
      (response) => {
        if (response.success) {
          this.alertifyService.success(response.message);
        } else {
          this.alertifyService.error(response.message);
        }
      },
      (error) => {
        this.alertifyService.error(error.error.message);
      }
    );
  }

  userAuthenticated() {
    let team = this.user.teams?.at(0);
    if (team.name != 'Montaj Takımı') {
      this.alert = 'Sadece Montaj Takımı Üyesi IHA Üretebilir!';
    }
  }
}

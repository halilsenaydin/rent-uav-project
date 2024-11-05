import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Airplane } from '../../../models/entities/airplane';
import { AirplaneService } from '../../../services/airplane.service';
import { PieceService } from '../../../services/piece.service';
import { Piece } from '../../../models/entities/piece';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/entities/user';
import { ProducedPiece } from '../../../models/entities/producedPiece';
import { ProducedPieceService } from '../../../services/produced-piece.service';
import { AlertifyService } from '../../../services/alertify.service';

@Component({
  selector: 'app-produce-piece',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produce-piece.component.html',
  styleUrl: './produce-piece.component.css',
})
export class ProducePieceComponent implements OnInit {
  newPiece: ProducedPiece = {
    piece: null,
    airplane: null,
    producedDate: new Date(),
    team: null,
    status: true,
  };

  user: User;
  airplanes: Airplane[] = [];
  pieces: Piece[] = [];
  alert: string = null;

  constructor(
    private alertifyService: AlertifyService,
    private producedPieceService: ProducedPieceService,
    private airplaneService: AirplaneService,
    private pieceService: PieceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAirplanes();
    this.getPieces();
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

  getPieces() {
    this.pieceService.getPieces().subscribe((response) => {
      if (response.success) {
        this.pieces = response.data;
      }
    });
  }

  addPiece() {
    let team = this.user.teams?.at(0);
    this.newPiece.team = team.id;
    this.producedPieceService.create(this.newPiece).subscribe(
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
    if (team.name == 'Montaj Takımı') {
      this.alert = 'Montaj Takımı Üyesi Parça Ekleyemez!';
    }
  }
}

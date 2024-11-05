import { Component, OnInit } from '@angular/core';
import { AirplaneService } from '../../services/airplane.service';
import { PieceService } from '../../services/piece.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/entities/user';
import { Airplane } from '../../models/entities/airplane';
import { Piece } from '../../models/entities/piece';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private airplaneService: AirplaneService,
    private pieceService: PieceService
  ) {}

  user: User;
  airplanes: Airplane[] = [];
  pieces: Piece[] = [];

  ngOnInit(): void {
    this.getAirplanes();
    this.getPieces();
    this.getUser();
  }

  getUser() {
    let username = localStorage.getItem('userName');
    this.userService.getUser(username).subscribe((response) => {
      if (response.success) {
        this.user = response.data;
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
}

import { Component } from '@angular/core';
import { ProducedPieceService } from '../../../services/produced-piece.service';
import { ProducedPiecesTableComponent } from '../../stone/inventory/produced-pieces-table/produced-pieces-table.component';
import { ProducedPieceDto } from '../../../models/dtos/producedPieceDto';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/entities/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produced-pieces',
  standalone: true,
  imports: [ProducedPiecesTableComponent, CommonModule],
  templateUrl: './produced-pieces.component.html',
  styleUrl: './produced-pieces.component.css',
})
export class ProducedPiecesComponent {
  constructor(
    private producedPieceService: ProducedPieceService,
    private userService: UserService
  ) {}

  isAssemblyUser: boolean = false;
  producedPieces: ProducedPieceDto[] = [];
  total: number;
  stock: number;
  user: User;
  showAlert: boolean = false;
  zeroStockAirplanes: string[] = [];

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    let username = this.userService.getUserNameFromLocalStorage();
    this.userService.getUser(username).subscribe((response) => {
      if (response.success) {
        this.user = response.data;
        this.userAuthenticated();
        this.countProducedPiecesStockByModel();
      }
    });
  }

  getProducedPieces() {
    this.producedPieceService.getProducedPieces().subscribe((response) => {
      if (response.success) {
        this.producedPieces = response.data.rows;
        this.total = response.data.total;
        this.stock = response.data.stock;
      }
    });
  }

  getProducedPiecesByTeamId(id: number) {
    this.producedPieceService
      .getProducedPiecesByTeamId(id)
      .subscribe((response) => {
        if (response.success) {
          this.producedPieces = response.data.rows;
          this.total = response.data.total;
          this.stock = response.data.stock;
        }
      });
  }

  countProducedPiecesStockByModel() {
    this.producedPieceService
      .countProducedPiecesStockByModel()
      .subscribe((response) => {
        if (response.success) {
          this.zeroStockAirplanes = Object.keys(response.data).filter(
            (airplane) => response.data[airplane] === 0
          );
          this.showAlert = this.zeroStockAirplanes.length > 0;
        }
      });
  }

  userAuthenticated() {
    let team = this.user.teams?.at(0);
    if (team.name == 'Montaj Takımı') {
      this.isAssemblyUser = true;
      return this.getProducedPieces();
    }
    return this.getProducedPiecesByTeamId(team.id);
  }
}

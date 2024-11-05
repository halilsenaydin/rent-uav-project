import { Component } from '@angular/core';
import { ProducedAirplane } from '../../../models/entities/producedAirplane';
import { ProducedAirplaneService } from '../../../services/produced-airplane.service';
import { ProducedAirplanesTableComponent } from '../../stone/inventory/produced-airplanes-table/produced-airplanes-table.component';
import { ProducedAirplaneDto } from '../../../models/dtos/producedAirplaneDto';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/entities/user';

@Component({
  selector: 'app-produced-airplanes',
  standalone: true,
  imports: [CommonModule, ProducedAirplanesTableComponent],
  templateUrl: './produced-airplanes.component.html',
  styleUrl: './produced-airplanes.component.css',
})
export class ProducedAirplanesComponent {
  constructor(
    private producedAirplaneService: ProducedAirplaneService,
    private userService: UserService
  ) {}

  alert: string = null;
  user: User;
  producedAirplanes: ProducedAirplaneDto[] = [];

  ngOnInit(): void {
    this.getProducedAirplanes();
    this.getUser();
  }

  getProducedAirplanes() {
    this.producedAirplaneService
      .getProducedAirplanes()
      .subscribe((response) => {
        if (response.success) {
          this.producedAirplanes = response.data;
        }
      });
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

  userAuthenticated() {
    let team = this.user.teams?.at(0);
    if (team.name != 'Montaj Takımı') {
      this.alert =
        'Sadece Montaj Takımı Üyesi Üretilen Uçakları Listeleyebilir';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-v1',
  templateUrl: './nav-v1.component.html',
  styleUrls: ['./nav-v1.component.css'],
})
export class NavV1Component {
  currentUrl: string = '';
  isAuthenticated = false;
  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.url;
      });
  }

  logout() {
    this.authService.logout();
  }
}

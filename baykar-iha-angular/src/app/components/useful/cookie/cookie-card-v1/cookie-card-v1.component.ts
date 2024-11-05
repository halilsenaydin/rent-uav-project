import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-card-v1',
  templateUrl: './cookie-card-v1.component.html',
  styleUrls: ['./cookie-card-v1.component.css']
})
export class CookieCardV1Component implements OnInit {
  cookiesAccepted: boolean = localStorage.getItem("cookiesAccepted") ? false : true;

  constructor() { }

  ngOnInit(): void {
  }

  acceptCookies(){
    localStorage.setItem("cookiesAccepted", "Çerezler Kabul Edildi");
    this.cookiesAccepted = false;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-v2',
  templateUrl: './cover-v2.component.html',
  styleUrls: ['./cover-v2.component.css']
})
export class CoverV2Component implements OnInit {
  @Input() title:string;
  @Input() caption:string;
  @Input() description:string;
  @Input() link:string;
  @Input() btnText:string;
  @Input() gif: string;
  constructor() { }

  ngOnInit(): void {
  }
}
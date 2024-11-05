import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover-v1',
  templateUrl: './cover-v1.component.html',
  styleUrls: ['./cover-v1.component.css']
})
export class CoverV1Component implements OnInit {
  @Input() caption:string;
  @Input() description:string;
  @Input() link:string;
  @Input() btnText:string;
  constructor() { }

  ngOnInit(): void {
  }

}

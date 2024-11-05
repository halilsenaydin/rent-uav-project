import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomeComponent } from './home.component';
import { ProducedPiecesComponent } from './produced-pieces/produced-pieces.component';
import { ProducedAirplanesComponent } from './produced-airplanes/produced-airplanes.component';
import { ProduceAirplaneComponent } from './produce-airplane/produce-airplane.component';
import { ProducePieceComponent } from './produce-piece/produce-piece.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ProducedPiecesComponent,
    ProducedAirplanesComponent,
    ProduceAirplaneComponent,
    ProducePieceComponent,
  ],
  declarations: [HomeComponent, NotFoundPageComponent],
})
export class HomeModule {}

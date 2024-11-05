import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutV1Component } from '../layout/main-layout-v1/main-layout-v1.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../auth/login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProducedPiecesComponent } from './produced-pieces/produced-pieces.component';
import { ProducePieceComponent } from './produce-piece/produce-piece.component';
import { ProducedAirplanesComponent } from './produced-airplanes/produced-airplanes.component';
import { ProduceAirplaneComponent } from './produce-airplane/produce-airplane.component';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutV1Component,
    children: [
      { path: '', component: HomeComponent, canActivate: [LoginGuard] },
      {
        path: 'produced-pieces',
        component: ProducedPiecesComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'produced-pieces/produce',
        component: ProducePieceComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'produced-airplanes',
        component: ProducedAirplanesComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'produced-airplanes/produce',
        component: ProduceAirplaneComponent,
        canActivate: [LoginGuard],
      },
      { path: 'auth/login', component: LoginComponent },
      { path: '**', component: NotFoundPageComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "../auth/login/login.component";
import { CookieCardV1Component } from "../useful/cookie/cookie-card-v1/cookie-card-v1.component";
import { CoverV1Component } from "../useful/cover/cover-v1/cover-v1.component";
import { CoverV2Component } from "../useful/cover/cover-v2/cover-v2.component";
import { MobileAppPageV1Component } from "../useful/mobile-app/mobile-app-page-v1/mobile-app-page-v1.component";
import { SearchV2Component } from "../useful/search/search-v2/search-v2.component";
import { SearchV1Component } from "../useful/search/search-v1/search-v1.component";
import { ShimmerV1Component } from "../useful/shimmer/shimmer-v1/shimmer-v1.component";
import { RouterModule } from "@angular/router";
import { PiecesTableComponent } from "../stone/inventory/pieces-table/pieces-table.component";
import { AirplanesTableComponent } from "../stone/inventory/airplanes-table/airplanes-table.component";
import { ProducedAirplanesTableComponent } from "../stone/inventory/produced-airplanes-table/produced-airplanes-table.component";
import { ProducedPiecesTableComponent } from "../stone/inventory/produced-pieces-table/produced-pieces-table.component";
import { UserCardComponent } from "../stone/user/user-card/user-card.component";
import { FilterByProducedAirplanePipe } from "../../pipes/filter-by-produced-airplane.pipe";
import { FilterByProducedPiecePipe } from "../../pipes/filter-by-produced-piece.pipe";
import { QuizzesTableComponent } from "../stone/quiz/quizzes-table/quizzes-table.component";

@NgModule({
  declarations: [
    LoginComponent,

    CookieCardV1Component,
    CoverV1Component,
    CoverV2Component,
    MobileAppPageV1Component,
    SearchV2Component,
    SearchV1Component,
    ShimmerV1Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    PiecesTableComponent,
    AirplanesTableComponent,
    ProducedAirplanesTableComponent,
    ProducedPiecesTableComponent,
    UserCardComponent,
    QuizzesTableComponent,

    // Pipes
    FilterByProducedAirplanePipe,
    FilterByProducedPiecePipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    LoginComponent,

    CookieCardV1Component,
    CoverV1Component,
    CoverV2Component,
    MobileAppPageV1Component,
    SearchV2Component,
    SearchV1Component,
    ShimmerV1Component,
    UserCardComponent,
    PiecesTableComponent,
    AirplanesTableComponent,
    ProducedAirplanesTableComponent,
    ProducedPiecesTableComponent,
    QuizzesTableComponent,

    // Pipes
    FilterByProducedAirplanePipe,
    FilterByProducedPiecePipe,
  ],
})
export class SharedModule {}

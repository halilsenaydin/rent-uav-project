import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { AlertifyService } from './services/alertify.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LayoutModule } from './components/layout/layout.module';
import { HomeModule } from './components/home/home.module';
import { AppComponent } from './app.component';

// Router configuration
const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    HomeModule,
    HttpClientModule,
    AppComponent,
  ],
  exports: [RouterModule],
  providers: [
    AlertifyService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutV1Component } from './main-layout-v1/main-layout-v1.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardLayoutV1Component } from './dashboard-layout-v1/dashboard-layout-v1.component';
import { BaseModule } from '../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BaseModule,
    RouterModule.forChild([])
  ],
  declarations: [
    MainLayoutV1Component,
    DashboardLayoutV1Component
  ],
  exports: [
    MainLayoutV1Component,
    DashboardLayoutV1Component
  ]
})
export class LayoutModule { }

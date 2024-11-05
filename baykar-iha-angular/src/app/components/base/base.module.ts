import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FooterV1Component } from './footers/footer-v1/footer-v1.component';
import { NavV1Component } from './navs/nav-v1/nav-v1.component';

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild([])],
  declarations: [FooterV1Component, NavV1Component],
  exports: [FooterV1Component, NavV1Component],
})
export class BaseModule {}

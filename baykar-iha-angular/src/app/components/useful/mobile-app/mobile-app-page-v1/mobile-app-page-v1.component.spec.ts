import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAppPageV1Component } from './mobile-app-page-v1.component';

describe('MobileAppPageV1Component', () => {
  let component: MobileAppPageV1Component;
  let fixture: ComponentFixture<MobileAppPageV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAppPageV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAppPageV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

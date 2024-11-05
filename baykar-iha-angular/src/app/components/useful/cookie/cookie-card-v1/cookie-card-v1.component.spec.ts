import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieCardV1Component } from './cookie-card-v1.component';

describe('CookieCardV1Component', () => {
  let component: CookieCardV1Component;
  let fixture: ComponentFixture<CookieCardV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieCardV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookieCardV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

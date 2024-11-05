import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShimmerV1Component } from './shimmer-v1.component';

describe('ShimmerV1Component', () => {
  let component: ShimmerV1Component;
  let fixture: ComponentFixture<ShimmerV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShimmerV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShimmerV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

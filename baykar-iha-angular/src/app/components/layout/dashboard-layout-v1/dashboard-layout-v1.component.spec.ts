import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayoutV1Component } from './dashboard-layout-v1.component';

describe('DashboardLayoutV1Component', () => {
  let component: DashboardLayoutV1Component;
  let fixture: ComponentFixture<DashboardLayoutV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLayoutV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesTableComponent } from './airplanes-table.component';

describe('AirplanesTableComponent', () => {
  let component: AirplanesTableComponent;
  let fixture: ComponentFixture<AirplanesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplanesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirplanesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

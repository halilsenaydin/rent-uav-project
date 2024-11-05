import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedAirplanesTableComponent } from './produced-airplanes-table.component';

describe('ProducedAirplanesTableComponent', () => {
  let component: ProducedAirplanesTableComponent;
  let fixture: ComponentFixture<ProducedAirplanesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducedAirplanesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducedAirplanesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

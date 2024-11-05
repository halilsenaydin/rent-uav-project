import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedAirplanesComponent } from './produced-airplanes.component';

describe('ProducedAirplanesComponent', () => {
  let component: ProducedAirplanesComponent;
  let fixture: ComponentFixture<ProducedAirplanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducedAirplanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducedAirplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

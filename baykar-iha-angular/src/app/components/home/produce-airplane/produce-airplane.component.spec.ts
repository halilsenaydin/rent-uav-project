import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceAirplaneComponent } from './produce-airplane.component';

describe('ProduceAirplaneComponent', () => {
  let component: ProduceAirplaneComponent;
  let fixture: ComponentFixture<ProduceAirplaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduceAirplaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduceAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

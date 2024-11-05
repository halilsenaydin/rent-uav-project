import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedPiecesComponent } from './produced-pieces.component';

describe('ProducedPiecesComponent', () => {
  let component: ProducedPiecesComponent;
  let fixture: ComponentFixture<ProducedPiecesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducedPiecesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducedPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

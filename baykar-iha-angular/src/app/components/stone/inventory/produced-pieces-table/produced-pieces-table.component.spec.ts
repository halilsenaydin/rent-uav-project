import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducedPiecesTableComponent } from './produced-pieces-table.component';

describe('ProducedPiecesTableComponent', () => {
  let component: ProducedPiecesTableComponent;
  let fixture: ComponentFixture<ProducedPiecesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducedPiecesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducedPiecesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

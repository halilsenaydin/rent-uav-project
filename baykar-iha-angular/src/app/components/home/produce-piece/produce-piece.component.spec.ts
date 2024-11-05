import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducePieceComponent } from './produce-piece.component';

describe('ProducePieceComponent', () => {
  let component: ProducePieceComponent;
  let fixture: ComponentFixture<ProducePieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducePieceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

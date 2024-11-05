import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesTableComponent } from './pieces-table.component';

describe('PiecesTableComponent', () => {
  let component: PiecesTableComponent;
  let fixture: ComponentFixture<PiecesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiecesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiecesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

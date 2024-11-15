import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesTableComponent } from './quizzes-table.component';

describe('QuizzesTableComponent', () => {
  let component: QuizzesTableComponent;
  let fixture: ComponentFixture<QuizzesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

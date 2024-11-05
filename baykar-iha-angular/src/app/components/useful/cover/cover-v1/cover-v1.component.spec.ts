import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverV1Component } from './cover-v1.component';

describe('CoverV1Component', () => {
  let component: CoverV1Component;
  let fixture: ComponentFixture<CoverV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

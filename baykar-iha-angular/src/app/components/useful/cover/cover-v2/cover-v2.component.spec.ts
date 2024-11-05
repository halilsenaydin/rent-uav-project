import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverV2Component } from './cover-v2.component';

describe('CoverV2Component', () => {
  let component: CoverV2Component;
  let fixture: ComponentFixture<CoverV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

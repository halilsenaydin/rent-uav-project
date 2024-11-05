import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchV2Component } from './search-v2.component';

describe('SearchV2Component', () => {
  let component: SearchV2Component;
  let fixture: ComponentFixture<SearchV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

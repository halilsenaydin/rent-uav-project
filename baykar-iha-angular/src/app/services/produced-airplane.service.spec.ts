import { TestBed } from '@angular/core/testing';

import { ProducedAirplaneService } from './produced-airplane.service';

describe('ProducedAirplaneService', () => {
  let service: ProducedAirplaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducedAirplaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

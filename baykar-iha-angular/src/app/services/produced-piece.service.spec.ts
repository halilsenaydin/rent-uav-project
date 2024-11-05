import { TestBed } from '@angular/core/testing';

import { ProducedPieceService } from './produced-piece.service';

describe('ProducedPieceService', () => {
  let service: ProducedPieceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducedPieceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

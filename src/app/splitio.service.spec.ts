import { TestBed } from '@angular/core/testing';

import { SplitService } from './splitio.service';

describe('SplitService', () => {
  let service: SplitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SplitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

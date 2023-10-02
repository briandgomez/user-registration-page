import { TestBed } from '@angular/core/testing';

import { SuccessfulRequestService } from './successful-request.service';

describe('SuccessfulRequestService', () => {
  let service: SuccessfulRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessfulRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

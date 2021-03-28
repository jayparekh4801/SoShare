import { TestBed } from '@angular/core/testing';

import { PendingRequestsService } from './pending-requests.service';

describe('PendingRequestsService', () => {
  let service: PendingRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

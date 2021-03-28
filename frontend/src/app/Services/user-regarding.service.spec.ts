import { TestBed } from '@angular/core/testing';

import { UserRegardingService } from './user-regarding.service';

describe('UserRegardingService', () => {
  let service: UserRegardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FriendListService } from './friend-list.service';

describe('FriendListService', () => {
  let service: FriendListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

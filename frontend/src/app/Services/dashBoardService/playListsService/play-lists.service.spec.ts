import { TestBed } from '@angular/core/testing';

import { PlayListsService } from './play-lists.service';

describe('PlayListsService', () => {
  let service: PlayListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ImportPlayListsService } from './import-play-lists.service';

describe('ImportPlayListsService', () => {
  let service: ImportPlayListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportPlayListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

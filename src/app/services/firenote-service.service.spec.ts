import { TestBed } from '@angular/core/testing';

import { FirenoteService } from './firenote-service.service';

describe('FirenoteServiceService', () => {
  let service: FirenoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirenoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

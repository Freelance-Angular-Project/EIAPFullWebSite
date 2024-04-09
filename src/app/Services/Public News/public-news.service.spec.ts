import { TestBed } from '@angular/core/testing';

import { PublicNewsService } from './public-news.service';

describe('PublicNewsService', () => {
  let service: PublicNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

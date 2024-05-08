import { TestBed } from '@angular/core/testing';

import { LoaderProjectService } from './loader-project.service';

describe('LoaderProjectService', () => {
  let service: LoaderProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

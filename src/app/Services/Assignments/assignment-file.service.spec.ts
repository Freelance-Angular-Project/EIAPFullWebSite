import { TestBed } from '@angular/core/testing';

import { AssignmentFileService } from './assignment-file.service';

describe('AssignmentFileService', () => {
  let service: AssignmentFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

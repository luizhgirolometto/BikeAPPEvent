import { TestBed } from '@angular/core/testing';

import { AddUserlistService } from './add-userlist.service';

describe('AddUserlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddUserlistService = TestBed.get(AddUserlistService);
    expect(service).toBeTruthy();
  });
});

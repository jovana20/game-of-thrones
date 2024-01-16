import { TestBed } from '@angular/core/testing';

import { IceAndFireService } from './ice-and-fire.service';

describe('IceAndFireService', () => {
  let service: IceAndFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IceAndFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

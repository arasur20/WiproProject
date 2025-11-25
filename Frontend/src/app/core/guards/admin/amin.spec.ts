import { TestBed } from '@angular/core/testing';

import { Amin } from './amin';

describe('Amin', () => {
  let service: Amin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Amin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { Ble } from './ble';

describe('Ble', () => {
  let service: Ble;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ble);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

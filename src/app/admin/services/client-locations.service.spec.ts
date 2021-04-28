import { TestBed } from '@angular/core/testing';

import { ClienteLocationsService } from './client-locations.service';

describe('ClienteLocationsService', () => {
  let service: ClienteLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

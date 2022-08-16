import { TestBed } from '@angular/core/testing';

import { EntretienService } from './entretien.service';

describe('EntretienService', () => {
  let service: EntretienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntretienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

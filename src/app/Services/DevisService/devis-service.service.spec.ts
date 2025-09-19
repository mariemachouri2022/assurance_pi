import { TestBed } from '@angular/core/testing';
import { DevisService } from './devis-service.service'; // Changed from DevisServiceService to DevisService

describe('DevisService', () => { // Changed describe name to match service name
  let service: DevisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisService); // Changed to DevisService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
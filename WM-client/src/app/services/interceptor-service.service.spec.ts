import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor-service.service';

describe('InterceptorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });
});

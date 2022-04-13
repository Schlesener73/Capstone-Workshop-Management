import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ServerService } from './server.service';

describe('ServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: ServerService = TestBed.get(ServerService);
    expect(service).toBeTruthy();
  });
});

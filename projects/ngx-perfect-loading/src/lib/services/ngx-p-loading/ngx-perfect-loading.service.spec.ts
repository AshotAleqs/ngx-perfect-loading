import { TestBed } from '@angular/core/testing';
import { NgxPLoadingService } from './ngx-perfect-loading.service';


describe('NgxPLoadingService', () => {
  let service: NgxPLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

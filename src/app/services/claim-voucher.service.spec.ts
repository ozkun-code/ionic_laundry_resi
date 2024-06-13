import { TestBed } from '@angular/core/testing';

import { ClaimVoucherService } from './claim-voucher.service';

describe('ClaimVoucherService', () => {
  let service: ClaimVoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimVoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimVoucherPage } from './claim-voucher.page';

describe('ClaimVoucherPage', () => {
  let component: ClaimVoucherPage;
  let fixture: ComponentFixture<ClaimVoucherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

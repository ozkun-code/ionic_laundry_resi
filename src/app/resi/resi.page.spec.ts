import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResiPage } from './resi.page';

describe('ResiPage', () => {
  let component: ResiPage;
  let fixture: ComponentFixture<ResiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

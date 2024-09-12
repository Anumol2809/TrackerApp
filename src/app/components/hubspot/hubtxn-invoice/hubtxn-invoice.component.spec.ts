import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubtxnInvoiceComponent } from './hubtxn-invoice.component';

describe('HubtxnInvoiceComponent', () => {
  let component: HubtxnInvoiceComponent;
  let fixture: ComponentFixture<HubtxnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubtxnInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubtxnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

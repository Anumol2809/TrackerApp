import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnInvoiceComponent } from './txn-invoice.component';

describe('TxnInvoiceComponent', () => {
  let component: TxnInvoiceComponent;
  let fixture: ComponentFixture<TxnInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxnInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxnInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnCustomerComponent } from './txn-customer.component';

describe('TxnCustomerComponent', () => {
  let component: TxnCustomerComponent;
  let fixture: ComponentFixture<TxnCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxnCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxnCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

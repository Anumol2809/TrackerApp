import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubtxnCustomerComponent } from './hubtxn-customer.component';

describe('HubtxnCustomerComponent', () => {
  let component: HubtxnCustomerComponent;
  let fixture: ComponentFixture<HubtxnCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubtxnCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubtxnCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

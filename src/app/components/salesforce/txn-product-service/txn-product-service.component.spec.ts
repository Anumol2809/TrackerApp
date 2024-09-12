import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnProductServiceComponent } from './txn-product-service.component';

describe('TxnProductServiceComponent', () => {
  let component: TxnProductServiceComponent;
  let fixture: ComponentFixture<TxnProductServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxnProductServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxnProductServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubtxnProductServiceComponent } from './hubtxn-product-service.component';

describe('HubtxnProductServiceComponent', () => {
  let component: HubtxnProductServiceComponent;
  let fixture: ComponentFixture<HubtxnProductServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubtxnProductServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubtxnProductServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

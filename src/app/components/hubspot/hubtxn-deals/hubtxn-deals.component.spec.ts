import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubtxnDealsComponent } from './hubtxn-deals.component';

describe('HubtxnDealsComponent', () => {
  let component: HubtxnDealsComponent;
  let fixture: ComponentFixture<HubtxnDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubtxnDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubtxnDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

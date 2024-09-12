import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxnOpportunityComponent } from './txn-opportunity.component';

describe('TxnOpportunityComponent', () => {
  let component: TxnOpportunityComponent;
  let fixture: ComponentFixture<TxnOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TxnOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TxnOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

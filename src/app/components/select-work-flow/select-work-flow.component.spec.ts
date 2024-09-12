import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWorkFlowComponent } from './select-work-flow.component';

describe('SelectWorkFlowComponent', () => {
  let component: SelectWorkFlowComponent;
  let fixture: ComponentFixture<SelectWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectWorkFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

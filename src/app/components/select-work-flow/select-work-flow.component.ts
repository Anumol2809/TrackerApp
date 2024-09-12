import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-work-flow',
  templateUrl: './select-work-flow.component.html',
  styleUrls: ['./select-work-flow.component.scss']
})
export class SelectWorkFlowComponent implements OnInit {
  @Output() newWorkEvent = new EventEmitter<string>();
  workFlow:any ;
  constructor(private dialogRef: MatDialogRef<SelectWorkFlowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    
    if(this.data){
      this.workFlow = this.data;
    }
    else{
      this.workFlow ="Slow Payers";
    }
   
  }
  onCancel(){
    this.dialogRef.close(false);
  }
  onSubmit(){
    this.newWorkEvent.emit(this.workFlow);
    this.dialogRef.close(false);
  }
}

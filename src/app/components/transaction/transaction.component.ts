import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  selectTab:any;
  selectedInt: any =3;
  selectTabs:any;
  constructor(private state : StateManagerService) { }

  ngOnInit(): void {
    this.state.SelectedId.subscribe((data) => {
      if(data){
        console.log(data);
        this.selectedInt = data;
      }
     
     });

   
  }
  tabClick(event:any){

  }
}

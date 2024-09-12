import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebar: any;
  closeBtn: any;
  searchBtn: any;
 
  sidebarOpen = false;

  MenuImage = {
    'dash': 'assets/images/dash.png',
    'dash_active': 'assets/images/dash_act.png',
    'log_active': 'assets/images/log_act.png',
    'log': 'assets/images/log.png',
    'trans_active': 'assets/images/trans_act.png',
    'trans': 'assets/images/trans.png',
    'sched_active': 'assets/images/sched_act.png',
    'sched': 'assets/images/sched.png',
    'int_active': 'assets/images/int_act.png',
    'int': 'assets/images/int.png',
    'set_active': 'assets/images/set_act.png',
    'set': 'assets/images/set.png'
  }

  constructor(private state : StateManagerService) { }

  ngOnInit(): void {

  //   this.sidebar = document.querySelector(".sidebar");
  // this.closeBtn = document.querySelector("#btn");

  // this.closeBtn.addEventListener("click", ()=>{
  //   this.sidebar.classList.toggle("open");
  //   this.menuBtnChange();
  // });
 
}
openSidebar(){
  this.sidebarOpen = true;
  this.state.setSidebarChanged("true");
}
closeSidebar(){
  this.sidebarOpen = false;
  this.state.setSidebarChanged("false");
}
// menuBtnChange() {
//   if(this.sidebar.classList.contains("open")){
//     this.closeBtn.classList.replace("fa-bars", "fa-chevron-left");
//   }else {
//     this.closeBtn.classList.replace("fa-chevron-left","fa-bars");
//   }
//  }

}

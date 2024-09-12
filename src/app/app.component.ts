import { Component } from '@angular/core';
import { StateManagerService } from './services/state-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'graphTest';
  sidebarOpen!: boolean;
  showContent :boolean = true;
  UserLogined: boolean =false;
  constructor(private state : StateManagerService) { }

  ngOnInit(): void {

  this.state.sidebarChanged.subscribe((data) => {
    if (data == "true") {
      
     // this.showContent = false
      setTimeout(() => {
        //this.showContent = true;
        this.sidebarOpen = true;
      }, 110);
    }
    else{
      

      //this.showContent = false
      setTimeout(() => {
        this.sidebarOpen = false;
        //this.showContent = true
      },110);
    }
  });
 

  this.state.userName.subscribe((data) => {
    console.log(data);
    if (data) {
      this.UserLogined = true;
    } else {
      this.UserLogined = false;
   
    }
  });

  if (localStorage.getItem('session.username') == null) {
    console.log(localStorage.getItem('session.username'));
    
    this.UserLogined = false;
  }
  else{
    this.UserLogined = true;
  }
}
}

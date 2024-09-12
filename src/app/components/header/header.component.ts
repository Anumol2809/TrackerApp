import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagerService } from 'src/app/services/state-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  Systems:any=[
    {

    id:2,
    name :"Hubspot"
  },
  {

    id:3,
    name :"Salesforce"
  },
]
 
  LoginedUser: boolean = false;
  displayname!: string;
  selected_int: string;
  constructor(private state : StateManagerService,private router:Router) {

    if(localStorage.getItem("connectedSys")){
      this.selected_int = localStorage.getItem("connectedSys") || '{}';
    }
    else{
      this.selected_int = this.Systems[1].name;
      localStorage.setItem("connectedSysId" ,this.Systems[1].id)
      localStorage.setItem("connectedSys" ,this.selected_int)
    }
  
  //this.state.setSelectedName(this.selected_int)
 
   }

  ngOnInit(): void {
  }
  selectInt(sys:any){
 
   this.selected_int = sys.name;
   
   this.state.setSelectedName(this.selected_int);
   this.state.setSelectedId(sys.id);
   localStorage.setItem("connectedSysId" ,sys.id);
   localStorage.setItem("connectedSys" ,this.selected_int)
  }
  signIn(){
    this.router.navigate(['/login'])
  }
  signOut(){
    console.log("sign out");
  //   const iframe = document.createElement('iframe');
  // iframe.src = 'https://accounts.google.com/Logout';
  // iframe.style.display = 'none';
  // document.body.appendChild(iframe);
  // setTimeout(() => document.body.removeChild(iframe), 100);


       this.LoginedUser = false;
        this.displayname = "";
        this.state.publishUsername(null);
        localStorage.clear();
        this.router.navigateByUrl("");
  }

  
}

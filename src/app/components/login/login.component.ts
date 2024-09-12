import { Component, OnInit,NgZone, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { accounts } from "google-one-tap";
import * as CONSTS from "src/app/utils/myconstants";
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoginParam } from 'src/app/vos/loginVO';
declare var google: any;
import { AuthVO, PrepareUrlVO } from "src/app/vos/compVO";
import { StateManagerService } from 'src/app/services/state-manager.service';
import { ServerServiceService } from 'src/app/services/server-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,AfterViewInit{
  clientId = "466677035572-vplivh2748spereut7pe4d22ppll2ols.apps.googleusercontent.com"; 
//gAccounts = google.accounts;
 LoginForm! :FormGroup;
 submitted!:boolean
  user: any;
  errorMsgFlag: boolean=false;
  loading: boolean = false;


  IntuitCode:any
  RealmID:any
  stateCode:any
  errorMsg:any
  encryptpassword = "JMDJMD";
  returnUrl: any;
  returnURL: any;
  postsContent: any=[];
  constructor(private ngZone: NgZone ,private router:Router,private fb:FormBuilder,
    private activatedRoute: ActivatedRoute,private state: StateManagerService,
    private serverservice: ServerServiceService,
    public dialog: MatDialog,
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.IntuitCode = params[CONSTS.AppSettings.code];
      this.RealmID = params[CONSTS.AppSettings.realmid];
      this.stateCode = params["state"];
      this.returnUrl = params["returnUrl"];
    });

    if (
      localStorage.getItem("session.key") &&
      !this.RealmID &&
      this.stateCode == "1234"
    ) {
      this.router.navigateByUrl("dashboard");
    }

    if (this.returnUrl) {
      localStorage.setItem("session.returnurl", JSON.stringify(this.returnUrl));
    }
   }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
    this.getSessionDetails();
  }
  
  SignInWithIntuit() {
    this.router.navigateByUrl("dashboard");
    localStorage.setItem(
      "session.username",
      JSON.stringify("username")
    );
    this.state.publishUsername("username");

    
    this.errorMsgFlag = false;
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
   this.loading = true;

    let prepare = new PrepareUrlVO();
    prepare.acctFlag = CONSTS.AppSettings.serviceval;
    prepare.compRedirect = 0;
    prepare.realmId = "";
    this.serverservice
      .callService("Admin_0", prepare, null, null, null)
      .subscribe(
        (data) => {
          //console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              dialogSpin.close();
              this.loading = false;
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          let url = data[0].url;
          window.location.href = url;
          dialogSpin.close();
        },
        (error) => {
          dialogSpin.close();
          //console.log(error);
          this.loading = false;
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  get f() {
    return this.LoginForm.controls;
  }
  SignIn() {
    this.submitted = true;
    this.errorMsgFlag = false;
    if (this.LoginForm.invalid) {
      return;
    }
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
   

    this.serverservice
      .callService("Admin_29", null, null, null, null)
      .subscribe(
        (data) => {
          //console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          if (data[0].v) {
            this.loginWithSighature(data[0].v, dialogSpin);
          }
        },
        (error) => {
          dialogSpin.close();
          //console.log(error);
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  loginWithSighature(sig:any, dialogSpin:any) {
    //console.log(this.serverservice.decryptData(sig));
    let sigNum = +this.serverservice.decryptData(sig);
    let offset = new Date().getTimezoneOffset();
    let login = new LoginParam();
    login.userid = this.LoginForm.value.email;
    login.password = this.serverservice.encryptData(
      this.LoginForm.value.password
    );
    //console.log(sigNum + 1);
    login.sig = this.serverservice.encryptData((sigNum + 1).toString());
    login.tmz = offset.toString();
    this.serverservice
      .callService("Admin_5", login, null, null, null)
      .subscribe(
        (data) => {
          //console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          let userid = data[0].userid;
          let username;
          if (data[0].familyName) {
            username = data[0].name + " " + data[0].familyName;
          } else {
            username = data[0].name;
          }

          let sessionkey = data[0].sessionKey;
          let compName = data[0].compName;
          let role = data[0].role;
          let nouncevalue = this.serverservice.encryptData("0");
          localStorage.setItem("session.nounce", JSON.stringify(nouncevalue));
          localStorage.setItem("session.compName", JSON.stringify(compName));
          localStorage.setItem("session.role", JSON.stringify(role));
          localStorage.setItem(
            "session.tenantid",
            JSON.stringify(data[0].tenantid)
          );
          localStorage.setItem("session.key", JSON.stringify(sessionkey));
          localStorage.setItem("session.userid", JSON.stringify(userid));
          localStorage.setItem("session.username", JSON.stringify(username));
          localStorage.setItem("session.accountdisplay", JSON.stringify(false));
          this.state.publishUsername(username);
          if (this.returnURL) {
            this.router.navigateByUrl(this.returnURL);
          } else {
            this.router.navigateByUrl("dashboard");
          }

          dialogSpin.close();
        },
        (error) => {
          dialogSpin.close();
          //console.log(error);

          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  // To Sign in with intuit  by using session details
  getSessionDetails() {
    if (this.RealmID && this.IntuitCode) {
      const dialogSpin = this.dialog.open(SpinnerComponent, {
        backdropClass: "backdropBackground",
        disableClose: true,
        panelClass: "spinner-dialog",
      });

      if (this.RealmID != "null" && this.stateCode == "1234") {
        let login = new AuthVO();
        login.authCode = this.IntuitCode;
        login.realm = this.RealmID;
        let offset = new Date().getTimezoneOffset();
        login.tmz = offset.toString();
        //login.switchFlag = true;
        this.serverservice
          .callService("Admin_19", login, null, null, null)
          .subscribe(
            (data) => {
              //console.log(data);
              if (data[1]) {
                if (data[1].hasOwnProperty("error")) {
                  dialogSpin.close();
                  this.errorMsgFlag = true;
                  this.errorMsg = data[1].msg;
                  if (data[1].error == CONSTS.AppSettings.SessionError) {
                    this.serverservice.LogoutService();
                  }
                  return;
                }
              }
              if (data[0].planid == 0) {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let role = data[0].role;
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                this.state.publishUsername(username);
                this.router.navigateByUrl("subscription");
              } else {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let compName = data[0].compName;
                let role = data[0].role;
                localStorage.setItem(
                  "session.compName",
                  JSON.stringify(compName)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                localStorage.setItem(
                  "session.accountdisplay",
                  JSON.stringify(false)
                );
                this.state.publishUsername(username);
                if (this.returnURL) {
                  this.router.navigateByUrl(this.returnURL);
                } else {
                  this.router.navigateByUrl("home");
                }
              }

              dialogSpin.close();
            },
            (error) => {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = CONSTS.AppSettings.ErrorMsg;
            }
          );
      } else if (this.RealmID != "null" && this.stateCode == "4567") {
        let login = new AuthVO();
        login.authCode = this.IntuitCode;
        login.realm = this.RealmID;
        let offset = new Date().getTimezoneOffset();
        login.tmz = offset.toString();
        //login.switchFlag = true;
        this.serverservice
          .callService("Admin_32", login, null, null, null)
          .subscribe(
            (data) => {
              //console.log(data);
              if (data[1]) {
                if (data[1].hasOwnProperty("error")) {
                  dialogSpin.close();
                  this.errorMsgFlag = true;
                  this.errorMsg = data[1].msg;
                  if (data[1].error == CONSTS.AppSettings.SessionRegistered) {
                    this.serverservice.sessionRegistered();
                  }
                  if (data[1].error == CONSTS.AppSettings.SessionError) {
                    this.serverservice.LogoutService();
                  }
                  return;
                }
              }
              if (data[0].planid == 0) {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let role = data[0].role;
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                this.state.publishUsername(username);
                this.router.navigateByUrl("subscription");
              } else {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let compName = data[0].compName;
                let role = data[0].role;
                localStorage.setItem(
                  "session.compName",
                  JSON.stringify(compName)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                localStorage.setItem(
                  "session.accountdisplay",
                  JSON.stringify(false)
                );
                this.state.publishUsername(username);
                this.router.navigateByUrl("home");
              }

              dialogSpin.close();
            },
            (error) => {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = CONSTS.AppSettings.ErrorMsg;
            }
          );
      } else if (this.IntuitCode && this.stateCode == "1234") {
        let login = new LoginParam();
        let offset = new Date().getTimezoneOffset();
        login.password = this.IntuitCode;
        login.userid = "";
        login.tmz = offset.toString();
        this.serverservice
          .callService("Admin_1", login, null, null, null)
          .subscribe(
            (data) => {
              //console.log(data);
              if (data[1]) {
                if (data[1].hasOwnProperty("error")) {
                  dialogSpin.close();
                  this.errorMsgFlag = true;
                  this.errorMsg = data[1].msg;
                  if (data[1].error == CONSTS.AppSettings.SessionError) {
                    this.serverservice.LogoutService();
                  }
                  return;
                }
              }

              if (data[0].planid == 0) {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let role = data[0].role;
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                this.state.publishUsername(username);
                this.router.navigateByUrl("subscription");
              } else {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let compName = data[0].compName;
                let role = data[0].role;
                localStorage.setItem(
                  "session.compName",
                  JSON.stringify(compName)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                localStorage.setItem(
                  "session.accountdisplay",
                  JSON.stringify(false)
                );
                this.state.publishUsername(username);
                if (this.returnURL) {
                  this.router.navigateByUrl(this.returnURL);
                } else {
                  this.router.navigateByUrl("home");
                }
              }

              dialogSpin.close();
            },
            (error) => {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = CONSTS.AppSettings.ErrorMsg;
            }
          );
      } else {
        let login = new AuthVO();
        //console.log(this.stateCode);
        login.authCode = this.IntuitCode;
        login.realm = this.stateCode;
        let offset = new Date().getTimezoneOffset();
        login.tmz = offset.toString();
        //login.switchFlag = true;
        this.serverservice
          .callService("Admin_31", login, null, null, null)
          .subscribe(
            (data) => {
              //console.log(data);
              if (data[1]) {
                if (data[1].hasOwnProperty("error")) {
                  dialogSpin.close();
                  this.errorMsgFlag = true;
                  this.errorMsg = data[1].msg;
                  if (data[1].error == CONSTS.AppSettings.SessionError) {
                    this.serverservice.LogoutService();
                  }
                  return;
                }
              }
              if (data[0].planid == 0) {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let role = data[0].role;
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                this.state.publishUsername(username);
                this.router.navigateByUrl("subscription");
              } else {
                let userid = data[0].userid;
                let username = data[0].name + " " + data[0].familyName;
                let sessionkey = data[0].sessionKey;
                let compName = data[0].compName;
                let role = data[0].role;
                localStorage.setItem(
                  "session.compName",
                  JSON.stringify(compName)
                );
                let nouncevalue = this.serverservice.encryptData("0");
                localStorage.setItem(
                  "session.nounce",
                  JSON.stringify(nouncevalue)
                );
                localStorage.setItem("session.role", JSON.stringify(role));
                localStorage.setItem(
                  "session.tenantid",
                  JSON.stringify(data[0].tenantid)
                );
                localStorage.setItem("session.key", JSON.stringify(sessionkey));
                localStorage.setItem("session.userid", JSON.stringify(userid));
                localStorage.setItem(
                  "session.username",
                  JSON.stringify(username)
                );
                localStorage.setItem(
                  "session.accountdisplay",
                  JSON.stringify(false)
                );
                this.state.publishUsername(username);
                if (compName) {
                  this.router.navigateByUrl("home");
                } else {
                  this.router.navigateByUrl("add-company");
                }
              }

              dialogSpin.close();
            },
            (error) => {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = CONSTS.AppSettings.ErrorMsg;
            }
          );
      }
    }
  }

  ngAfterViewInit() {
    const gAccounts: accounts = google.accounts;

    gAccounts.id.initialize({
      client_id: this.clientId,
      ux_mode: "popup",
      allowed_parent_origin: "http://localhost:4200",
      cancel_on_tap_outside: true,
      callback: ({ credential }) => {
        this.ngZone.run(() => {
          this.SignInWithGoogle(credential);
        });
      },
    });

    gAccounts.id.renderButton(
      document.getElementById("Google_sign") as HTMLElement,
      {
        //size: 'large',
        width: 200,
      }
    );
    google.accounts.id.prompt();
  }

  private SignInWithGoogle(token: any) {
    // this.submitted = true;
    this.errorMsgFlag = false;
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
   
    this.serverservice
      .callService("Admin_29", null, null, null, null)
      .subscribe(
        (data) => {
          //console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          if (data[0].v) {
            this.loginWithGSighature(data[0].v, dialogSpin, token);
          }
        },
        (error) => {
          dialogSpin.close();
          //console.log(error);
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  loginWithGSighature(sig:any, dialogSpin:any, token:any) {
    //console.log(this.serverservice.decryptData(sig));
    let sigNum = +this.serverservice.decryptData(sig);
    let offset = new Date().getTimezoneOffset();
    let login = new LoginParam();
    login.userid = "";
    login.password = token;
    //console.log(sigNum + 1);
    login.sig = this.serverservice.encryptData((sigNum + 1).toString());
    login.tmz = offset.toString();
    this.serverservice
      .callService("Admin_14", login, null, null, null)
      .subscribe(
        (data) => {
          //console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty("error")) {
              dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          let userid = data[0].userid;
          let username;
          if (data[0].familyName) {
            username = data[0].name + " " + data[0].familyName;
          } else {
            username = data[0].name;
          }

          let sessionkey = data[0].sessionKey;
          let compName = data[0].compName;
          let role = data[0].role;
          let nouncevalue = this.serverservice.encryptData("0");
          localStorage.setItem("session.nounce", JSON.stringify(nouncevalue));
          localStorage.setItem("session.compName", JSON.stringify(compName));
          localStorage.setItem("session.role", JSON.stringify(role));
          localStorage.setItem(
            "session.tenantid",
            JSON.stringify(data[0].tenantid)
          );
          localStorage.setItem("session.key", JSON.stringify(sessionkey));
          localStorage.setItem("session.userid", JSON.stringify(userid));
          localStorage.setItem("session.username", JSON.stringify(username));
          localStorage.setItem("session.accountdisplay", JSON.stringify(false));
          this.state.publishUsername(username);

          if (data[0].planid == 0) {
            this.router.navigateByUrl("subscription");
          } else if (this.returnURL) {
            this.router.navigateByUrl(this.returnURL);
          } else {
            this.router.navigateByUrl("home");
          }

          dialogSpin.close();
        },
        (error) => {
          dialogSpin.close();
          //console.log(error);

          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  // OnSubmit(){
  //   this.submitted = true;
  //   if (this.LoginForm.invalid) {
  //     return;
  //   }

  //   console.log(this.LoginForm.value);
    
  // }
  // ngAfterViewInit(): void {
  //   this.renderGoogleSignInButton();
  // }
 
  // renderGoogleSignInButton() {
  //   const gAccounts: accounts = google.accounts;
  //   gAccounts.id.initialize({
  //     client_id: this.clientId,
  //     ux_mode: "popup",
  //     allowed_parent_origin: "http://localhost:4200",
  //     cancel_on_tap_outside: true,
  //     callback: ({ credential }) => {
  //       const userObject = this.decodeJwt(credential);
  //       this.ngZone.run(() => {
  //         this.user = userObject;
  //         console.log('Logged in user:', this.user);
         
          
  //         localStorage.setItem("userName" ,this.user.given_name);
  //         this.router.navigate(['/dashboard'])

          
  //       });
  //     },
  //   });
    
  //   gAccounts.id.renderButton(
  //     document.getElementById("Google_sign") as HTMLElement,
  //     {
  //       size: 'large',
  //       theme: 'outline',
  //       width: 230,
  //     }
  //   );
  //   //google.accounts.id.prompt();
  // }
  // signInWithGoogle(): void {
  //   google.accounts.id.prompt();

   

  // }

  // private decodeJwt(token: string): any {
  //   const base64Url = token.split('.')[1];
  //   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload);
  // }




}

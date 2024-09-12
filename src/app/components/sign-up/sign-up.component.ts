import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ServerServiceService } from "src/app/services/server-service.service";
import { StateManagerService } from "src/app/services/state-manager.service";
import * as CONSTS from "src/app/utils/myconstants";
import { SignUp } from "src/app/vos/loginVO";
import { SpinnerComponent } from "../spinner/spinner.component";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  errorMsgFlag = false;
  errorMsg:any
  submitted: Boolean = false;
  SignUpForm!: FormGroup;
  ShowOtp: Boolean = false;
  constructor(
    private serverservice: ServerServiceService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private state: StateManagerService,
    private router: Router
  ) {
   
  }

  ngOnInit() {
    this.SignUpForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      otp: [""],
    });
  }
  get f() {
    return this.SignUpForm.controls;
  }

  SendOtp() {
    this.errorMsgFlag = false;
    this.submitted = true;

    if (this.SignUpForm.invalid) {
      return;
    }
    //console.log(this.SignUpForm.value.email);
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    let signup = new SignUp();
    signup.emailid = this.SignUpForm.value.email;

    this.serverservice
      .callService("Admin_6", signup, null, null, null)
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
          this.ShowOtp = true;
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

  Signin() {
    this.submitted = true;
    this.errorMsgFlag = false;
    if (this.SignUpForm.invalid) {
      return;
    }
    //  this.ShowOtp = true
    //console.log(this.SignUpForm.value.email);
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });

    let signup = new SignUp();
    let offset = new Date().getTimezoneOffset();
    signup.emailid = this.SignUpForm.value.email;
    signup.givenName = this.SignUpForm.value.name;
    signup.tmz = offset.toString();
    //signup.tenantid = +this.SignUpForm.value.otp;

    let obj = {
      val: +this.SignUpForm.value.otp,
    };

    this.serverservice
      .callService("Admin_4", signup, obj, null, null)
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
          // this.ShowOtp = true
          //  let url = data[0].url;
          //window.location.href = url;
          let userid = data[0].userid;
          let username;
          if (data[0].familyName) {
            username = data[0].name + " " + data[0].familyName;
          } else {
            username = data[0].name;
          }

          let sessionkey = data[0].sessionKey;
          let compName = data[0].compName;
          localStorage.setItem("session.compName", JSON.stringify(compName));
          localStorage.setItem("session.key", JSON.stringify(sessionkey));
          localStorage.setItem("session.userid", JSON.stringify(userid));
          localStorage.setItem("session.username", JSON.stringify(username));
          localStorage.setItem("session.accountdisplay", JSON.stringify(false));
          let nouncevalue = this.serverservice.encryptData("0");
          localStorage.setItem("session.nounce", JSON.stringify(nouncevalue));
          this.state.publishUsername(username);
          this.router.navigate(["home"], {
            queryParams: {
              setpassword: 1,
              billingUserId: data[0].billingUserId,
              status: data[0].status,
            },
          });
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
}

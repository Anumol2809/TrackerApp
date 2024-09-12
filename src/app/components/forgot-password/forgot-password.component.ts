import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServerServiceService } from "src/app/services/server-service.service";
import { StateManagerService } from "src/app/services/state-manager.service";
import * as CONSTS from "src/app/utils/myconstants";
import { LoginParam, SignUp } from "src/app/vos/loginVO";
import { SpinnerComponent } from "../spinner/spinner.component";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  errorMsgFlag = false;
  errorMsg:any
  submitted: Boolean = false;
  ForgotForm!: FormGroup;
  ShowOtp: Boolean = false;
  matchingflag = false;
  constructor(
    private serverservice: ServerServiceService,
    public dialog: MatDialog,
    public fb: FormBuilder,
    private router: Router,
    private state: StateManagerService
  ) {
  }

  ngOnInit() {
    this.ForgotForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      otp: ["", Validators.required],
      pass: ["", [Validators.required, Validators.minLength(8)]],
      confirm: ["", Validators.required],
    });
  }
  get f() {
    return this.ForgotForm.controls;
  }

  SendOtp() {
    this.errorMsgFlag = false;
    this.submitted = true;
    this.ForgotForm.get("otp")?.clearValidators();
    this.ForgotForm.get("pass")?.clearValidators();
    this.ForgotForm.get("confirm")?.clearValidators();

    this.ForgotForm.get("otp")?.updateValueAndValidity();
    this.ForgotForm.get("pass")?.updateValueAndValidity();
    this.ForgotForm.get("confirm")?.updateValueAndValidity();
    if (this.ForgotForm.invalid) {
      return;
    }
    //console.log(this.ForgotForm.value.email);
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    let signup = new LoginParam();
    signup.userid = this.ForgotForm.value.email;

    this.serverservice
      .callService("Admin_9", signup, null, null, null)
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

  ResetPass() {
    this.errorMsgFlag = false;
    this.submitted = true;

    this.ForgotForm.controls["otp"].setValidators([Validators.required]);
    this.ForgotForm.controls["pass"].setValidators([
      Validators.required,
      Validators.minLength(8),
    ]);
    this.ForgotForm.controls["confirm"].setValidators([Validators.required]);
    this.ForgotForm.get("otp")?.updateValueAndValidity();
    this.ForgotForm.get("pass")?.updateValueAndValidity();
    this.ForgotForm.get("confirm")?.updateValueAndValidity();
    if (this.ForgotForm.invalid) {
      return;
    }
    // if (this.ForgotForm.value.pass == "") {
    //  // this.matchingflag = true;
    //   return;
    // }
    if (this.ForgotForm.value.pass != this.ForgotForm.value.confirm) {
      this.matchingflag = true;
      return;
    }
    this.matchingflag = false;

    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });

    this.serverservice
      .callService("Admin_29", null, null, null, null)
      .subscribe(
        (data) => {
          console.log(data);
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
            this.ResetPassWithSighature(data[0].v, dialogSpin);
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

  ResetPassWithSighature(sig:any, dialogSpin:any) {
    let forgot = new LoginParam();
    let offset = new Date().getTimezoneOffset();
    let sigNum = +this.serverservice.decryptData(sig);
    console.log(sigNum);
    forgot.userid = this.ForgotForm.value.email;
    forgot.password = this.serverservice.encryptData(
      this.ForgotForm.value.pass
    );
    forgot.sig = this.serverservice.encryptData((sigNum + 1).toString());
    forgot.tmz = offset.toString();
    console.log(+this.serverservice.decryptData(forgot.sig));
    let obj = {
      val: +this.ForgotForm.value.otp,
    };

    this.serverservice
      .callService("Admin_27", forgot, obj, null, null)
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
          localStorage.setItem("session.compName", JSON.stringify(compName));
          localStorage.setItem("session.role", JSON.stringify(role));
          localStorage.setItem("session.key", JSON.stringify(sessionkey));
          localStorage.setItem("session.userid", JSON.stringify(userid));
          localStorage.setItem("session.username", JSON.stringify(username));
          localStorage.setItem("session.accountdisplay", JSON.stringify(false));
          let nouncevalue = this.serverservice.encryptData("0");
          localStorage.setItem("session.nounce", JSON.stringify(nouncevalue));
          this.state.publishUsername(username);
          this.router.navigateByUrl("home");
          dialogSpin.close();
        },
        (error) => {
          dialogSpin.close();
          // console.log(error);
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
}

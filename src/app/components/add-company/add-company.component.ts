import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { ServerServiceService } from "src/app/services/server-service.service";
import { AuthVO, PrepareUrlVO } from "src/app/vos/compVO";
import * as CONSTS from "src/app/utils/myconstants";
import { StateManagerService } from "src/app/services/state-manager.service";
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../spinner/spinner.component';
//import { CompanyTimeComponent } from "src/app/Dialogs/company-time/company-time.component";
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  errorMsgFlag = false;
  errorMsg:any
  IntuitCode:any;
  RealmID:any;
  timeZone:any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serverservice: ServerServiceService,
    public dialog: MatDialog,
    private state: StateManagerService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.IntuitCode = params[CONSTS.AppSettings.code];
      this.RealmID = params[CONSTS.AppSettings.realmid];
      this.timeZone = params[CONSTS.AppSettings.tmz];
    });
  }

  ngOnInit() {
    if (this.IntuitCode && this.RealmID) {
      // const dialogFileUp: any = this.dialog.open(CompanyTimeComponent, {
      //   backdropClass: "backdropBackground1",
      //   disableClose: true,
      //   data: "Save",
      //   panelClass: "time-dialog",
      // });
      // dialogFileUp.componentInstance.closeClicked.subscribe((result) => {
      //   if (result) {
      //     dialogFileUp.close();
      //     this.addCompanyDetails(result, 0);
      //   }
      // });
    // } else if (this.RealmID && this.timeZone) {
    //   const dialogFileUp: any = this.dialog.open(CompanyTimeComponent, {
    //     backdropClass: "backdropBackground1",
    //     disableClose: true,
    //     data: "Update",
    //     panelClass: "time-dialog",
    //   });
    //   dialogFileUp.componentInstance.closeClicked.subscribe((result) => {
    //     if (result != 0) {
    //       dialogFileUp.close();
    //       this.addCompanyDetails(result, 1);
    //     } else {
    //       dialogFileUp.close();
    //       this.router.navigateByUrl("switch-company");
    //     }
    //   });
    }
    let comp = JSON.parse(localStorage.getItem("session.compName") || '{}');
    //console.log(comp);
  }
  // Navigate to switch-company after adding new company
  addCompanyDetails(time:any, i:any) {
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    let service = "";
    let login = new AuthVO();
    if (i == 0) {
      login.authCode = this.IntuitCode;
      login.switchFlag = false;
      service = "Admin_20";
    } else {
      service = "Admin_33";
    }
    login.realm = this.RealmID;
    login.tmz = time;
    //console.log(login);
    this.serverservice.callService(service, login, null, null, null).subscribe(
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
        let val;
        if (i == 0) {
          val = data[0][0];
        }

        if (val) {
          //console.log(val);
          //console.log(val.switchFlag);
          if (val.switchFlag) {
            let compName = data[0][1];
            localStorage.setItem("session.compName", JSON.stringify(compName));
            const user = JSON.parse(localStorage.getItem("session.username") || '{}');
            this.state.publishUsername(user);
            this.router.navigateByUrl("home");
          } else {
            this.router.navigateByUrl("switch-company");
          }
        } else {
          this.router.navigateByUrl("switch-company");
        }
        dialogSpin.close();
      },
      (error) => {
        //console.log(error);
        dialogSpin.close();
        this.errorMsgFlag = true;
        this.errorMsg = CONSTS.AppSettings.ErrorMsg;
      }
    );
  }

  // Navigate to switch-company after adding new company

  // Navigate to a url to Add new company that you want , from the company list
  addCompany() {
    this.errorMsgFlag = false;
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });

    let prepare = new PrepareUrlVO();
    prepare.acctFlag = CONSTS.AppSettings.serviceval_a;
    prepare.compRedirect = 1;
    prepare.realmId = "";

    this.serverservice
      .callService("Admin_0", prepare, null, null, null)
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
          let url = data[0].url;
          window.location.href = url;
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

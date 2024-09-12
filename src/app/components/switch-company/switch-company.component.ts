import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { StateManagerService } from "src/app/services/state-manager.service";
import * as CONSTS from "src/app/utils/myconstants";
import { ServerServiceService } from 'src/app/services/server-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PrepareUrlVO } from 'src/app/vos/compVO';
@Component({
  selector: 'app-switch-company',
  templateUrl: './switch-company.component.html',
  styleUrls: ['./switch-company.component.scss']
})
export class SwitchCompanyComponent implements OnInit {

  errorMsgFlag = false;
  errorMsg:any
  Company: any = [{
    realmId:12334343434,
    status:2,
    compName:"Sanbox",
    lastConnectedTime:"12:50",
    tmz:2,
    statusdesc:"asdd"
  },
  {
    realmId:13454343434,
    status:2,
    compName:"Sanbox",
    lastConnectedTime:"12:50",
    tmz:2,
    statusdesc:"asdd"
  }];
  isChecked =13454343434;
  disableBtns: boolean = false;
  constructor(
    private state: StateManagerService,
    private serverservice: ServerServiceService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getCompanyList();
  }

  // Radio button changing event function
 

  editTime(tab:any) {
    this.router.navigate(["add-company"], {
      queryParams: {
        tmz: tab.tmz,
        realmId: tab.realmId,
      },
    });
  }
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
  // To get the List of companies and details that added
  getCompanyList() {
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    var offset = new Date().getTimezoneOffset();
    let obj = {
      val: offset,
    };
    this.serverservice.callService("Admin_22", obj, null, null, null).subscribe(
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
        //this.Company = data;
        if (this.Company.length <= 1) {
          this.disableBtns = true;
        } else {
          this.disableBtns = false;
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

  disconnectQB(item:any) {
    this.errorMsgFlag = false;
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    let obj = {
      val: item.realmId,
    };
    this.serverservice.callService("Admin_28", obj, null, null, null).subscribe(
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
        let compName = data[0].compName;
        localStorage.setItem("session.compName", JSON.stringify(compName));

        const user = JSON.parse(localStorage.getItem("session.username") || '{}');
        this.state.publishUsername(user);
        dialogSpin.close();
        this.getCompanyList();
      },
      (error) => {
        dialogSpin.close();
        this.errorMsgFlag = true;
        this.errorMsg = CONSTS.AppSettings.ErrorMsg;
      }
    );
  }

  // To Switch a particular company that you want from the company list
  switchCompany() {
    this.errorMsgFlag = false;
    const dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: "backdropBackground",
      disableClose: true,
      panelClass: "spinner-dialog",
    });
    let obj = {
      val: this.isChecked,
    };
    this.serverservice.callService("Admin_21", obj, null, null, null).subscribe(
      (data) => {
        //console.log(data);
        if (data[1]) {
          if (data[1].hasOwnProperty("error")) {
            dialogSpin.close();
            this.errorMsgFlag = true;
            this.errorMsg = data[1].msg;
            if (data[1].error == CONSTS.AppSettings.DisconnectError) {
              this.errorMsgFlag = false;
              // const dialogFile: any = this.dialog.open(
              //   MessageControlComponent,
              //   {
              //     backdropClass: "backdropBackground",
              //     disableClose: true,
              //     panelClass: "missref-dialog",
              //     data: {
              //       header: CONSTS.AppSettings.DisconnectHeader,
              //       body: this.errorMsg,
              //     },
              //   }
              // );

              // dialogFile.componentInstance.closeClicked.subscribe((result) => {
              //   if (result == "close") {
              //     dialogFile.close();
              //     this.getCompanyList();
              //   }
              // });
            } else if (data[1].error == CONSTS.AppSettings.SessionError) {
              this.serverservice.LogoutService();
            }
            return;
          }
        }
        let compName = data[0].compName;
        localStorage.setItem("session.compName", JSON.stringify(compName));

        const user = JSON.parse(localStorage.getItem("session.username") || '{}');
        this.state.publishUsername(user);
        this.router.navigateByUrl("home");
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

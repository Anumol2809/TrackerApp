import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ServerServiceService } from 'src/app/services/server-service.service';
import { integrateVO } from 'src/app/vos/integrateVO';
import { SpinnerComponent } from '../spinner/spinner.component';
import * as CONSTS from 'src/app/utils/myconstants';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.scss'],
})
export class IntegrationsComponent implements OnInit {
  ConnSys:any = [];

  SysList = [
    {
      sysid: 2,
      name: 'Hubspot',
    },
    {
      sysid: 3,
      name: 'Salesforce',
    },
  ];

  //client_secret = '0F202D4CB16D3364CD45B95FF3071066C6845CBA0C2EC182E9CC5E23A153E305';
  //auth_url = 'https://ternarytechlabs2-dev-ed.develop.my.salesforce.com/services/oauth2/authorize?';
  auth_url = 'https://login.salesforce.com/services/oauth2/authorize?';
  client_Id =
    '3MVG9NnK0U_HimV52ItSO0zmiweU007fy6Aw3qk37gK247jVxTWJi3eJGacpUR_w15RCFOpdSAiEXSYmGvPRl';
  redirect_uri = 'http://localhost:4200/integration';
  response_type = 'code';
   codeVerifier!: string;
  auth_code: any;
  dialogSpin: any;
  errorMsgFlag: boolean=false;
  errorMsg: any;
  typesAr: any;
  connectedId: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private serverservice: ServerServiceService,
    public dialog: MatDialog
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.auth_code = params['code'];
      this.connectedId = params['state'];
    });
  }

  ngOnInit(): void {
    if (this.auth_code) {
      console.log(this.auth_code);
      this.getLogin(this.auth_code);
    } else {
      this.getConnected();
    }

    //this.codeVerifier = this.generateRandomString();
  }
  getLogin(auth_code:any) {
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: 'backdropBackground',
      disableClose: true,
      panelClass: 'spinner-dialog',
    });

    let sys = new integrateVO();
    sys.sysId = this.connectedId;
    sys.tenantId = 1;
    sys.code = auth_code;

    this.serverservice
      .callService('SourceConnect_02', sys, null, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }
          this.getConnected();
          //  this.typesAr = data[0];
          //  this.getEntityData();
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }
  getConnected() {
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: 'backdropBackground',
      disableClose: true,
      panelClass: 'spinner-dialog',
    });

    this.serverservice
      .callService('SourceConnect_03', null, null, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }

          data.forEach((element:any) => {
            let sys:any = this.SysList.find((x) => x.sysid == element.sysId);
            this.ConnSys.push({
              sysId: element.sysId,
              onboarded: element.status,
              image: `assets/images/${sys.name}.png`,
              content:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
            });
          });

          this.dialogSpin.close();
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  Payment(id:any) {
    // if(id == 2){
    // const fullUrl = `${this.auth_url}client_id=${this.client_Id}&redirect_uri=${encodeURIComponent(this.redirect_uri)}`
    // + `&response_type=${this.response_type}&code_challenge_method=S256&code_challenge=${this.generateCodeChallenge()}`;
    // console.log(fullUrl);

    // window.location.href = fullUrl;
    // }
    this.dialogSpin = this.dialog.open(SpinnerComponent, {
      backdropClass: 'backdropBackground',
      disableClose: true,
      panelClass: 'spinner-dialog',
    });
    //  this.connectedId = id;

    let sys = new integrateVO();
    sys.sysId = id;
    this.serverservice
      .callService('SourceConnect_01', sys, null, null, null)
      .subscribe(
        (data) => {
          console.log(data);
          if (data[1]) {
            if (data[1].hasOwnProperty('error')) {
              this.dialogSpin.close();
              this.errorMsgFlag = true;
              this.errorMsg = data[1].msg;
              if (data[1].error == CONSTS.AppSettings.SessionError) {
                this.serverservice.LogoutService();
              }
              return;
            }
          }

          //window.location.href = data[0].url;
          this.dialogSpin.close();
        },
        (error) => {
          this.dialogSpin.close();
          //console.log(error)
          this.errorMsgFlag = true;
          this.errorMsg = CONSTS.AppSettings.ErrorMsg;
        }
      );
  }

  // private generateCodeChallenge(): string {
  //   const hashed = CryptoJS.SHA256(this.codeVerifier);
  //   return this.base64URLEncode(hashed.toString(CryptoJS.enc.Base64));
  // }

  // private base64URLEncode(str: string): string {
  //   return btoa(str)
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_')
  //     .replace(/=/g, '');
  // }
  // private generateRandomString(): string {
  //   const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   for (let i = 0; i < 32; i++) {
  //     result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  //   }
  //   return result;
  // }
}

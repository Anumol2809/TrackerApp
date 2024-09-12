import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { StateManagerService } from './state-manager.service';
import * as cf from './../utils/commonfs';
import * as CryptoJS from 'crypto-js'
@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  encryptedBase64Key = 'bIU/1yX4K9Hnn9E8eqIGkA==';
  parsedBase64Key = CryptoJS.enc.Base64.parse(this.encryptedBase64Key);
  //serverUrl = "https://online.dancingnumbers.com/DNOServerP/service/req/";
  //serverUrl = "https://qa.dancingnumbers.com/DNOServerQA/service/req/";
  //serverUrl = "http://localhost:8080/DNOServerQ/service/req/";
  serverUrl =
    'https://d79e-14-194-93-115.ngrok-free.app/DNOSyncServer/service/req/';
  //serverUrl = "http://www.ternarytechlabs.com:8080/DNOServerQ/service/req";
  //serverUrl = "https://online.dancingnumbers.com/DNOServerO/service/req/";
  //serverUrl = "http://localhost:8080/DNOnlineQ/service/req/";
  // serverUrl = "http://35.226.81.177:8080/DNOServer/service/req/";

  // clientId = "8417aac4-d437-4525-8587-3c0728e8154c";

  // redirectUri = "https://qa.dancingnumbers.com/mydn/sharepoint";
  // //redirectUri = "http://localhost:4200/mydn/sharepoint";

  // //https://jmd4tech.sharepoint.com/.default
  // scope = "openid profile offline_access";
  // apiUrl =
  //   "https://login.microsoftonline.com/c93ddf03-a5da-4bf6-b563-19f091af5c98/oauth2/v2.0/authorize?";
  // tokenUrl =
  //   "https://login.microsoftonline.com/c93ddf03-a5da-4bf6-b563-19f091af5c98/oauth2/v2.0/token";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
    }),
  };

  constructor(
    private http: HttpClient,
    private state: StateManagerService,
    private router: Router
  ) {}
  //To send service calling request
  public callService(
    id: string,
    inp0: Object | null,
    inp1: Object | null,
    inp2: Object | null,
    inp3: Object | null
  ): Observable<any> {
    let updatednounce;
    let nounce = JSON.parse(localStorage.getItem('session.nounce')|| '{}');
    // console.log(nounce);
    if (nounce) {
      let decNounce = +this.decryptData(nounce);
      localStorage.setItem(
        'session.nounce',
        JSON.stringify(this.encryptData((decNounce + 1).toString()))
      );
      // console.log(this.decryptData(nounce));
    } else {
      nounce = null;
    }

    var reqObject = cf.buildReqJson(id, inp0, inp1, inp2, inp3, nounce);
    var reqJson = JSON.stringify(reqObject);
    console.log(reqJson);
    return this.http.post<string>(this.serverUrl, reqJson, this.httpOptions);
  }
  // Logout and navigate to Session-expired page when getting EFR115 error
  public LogoutService() {
    localStorage.setItem('session.key', JSON.stringify('111'));
    this.state.publishUsername(null);
    localStorage.clear();
    this.router.navigate(['session']);
  }

  public sessionRegistered() {
    localStorage.setItem('session.key', JSON.stringify('111'));
    this.state.publishUsername(null);
    localStorage.clear();
    this.router.navigate(['user-registered']);
  }

  public encryptData(data:any) {
    const encryptedData = CryptoJS.AES.encrypt(data, this.parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encryptedData.toString();
  }

  public decryptData(data:any) {
    const decryptedData = CryptoJS.AES.decrypt(data, this.parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decryptedData.toString(CryptoJS.enc.Utf8);
  }

  
}

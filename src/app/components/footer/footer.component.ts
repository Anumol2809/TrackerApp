import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private _jsonURL = "assets/config.json";
  phNo: any;
  email: any;
  copyYr: any;
  telLink: any;
  emailLink: any;
  constructor(private http: HttpClient) {
    this.getJSON().subscribe((data: any) => {
      this.copyYr = data.copyright;
      this.phNo = data.phone;
      this.telLink = "tel:" + this.phNo;
      this.email = data.email;
      this.emailLink = "mailto:" + this.email;
    });
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }
  ngOnInit(): void {
  }

}

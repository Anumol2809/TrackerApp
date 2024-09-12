import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { TxnOpportunityComponent } from './components/salesforce/txn-opportunity/txn-opportunity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from "@angular/material/tabs";
import { HubtxnInvoiceComponent } from './components/hubspot/hubtxn-invoice/hubtxn-invoice.component';
import { HubtxnDealsComponent } from './components/hubspot/hubtxn-deals/hubtxn-deals.component';
import { HubtxnCustomerComponent } from './components/hubspot/hubtxn-customer/hubtxn-customer.component';
import { HubtxnProductServiceComponent } from './components/hubspot/hubtxn-product-service/hubtxn-product-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule  } from '@angular/material/checkbox';
import { MatRadioModule  } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SelectWorkFlowComponent } from './components/select-work-flow/select-work-flow.component';
import { TxnCustomerComponent } from './components/salesforce/txn-customer/txn-customer.component';
import { TxnInvoiceComponent } from './components/salesforce/txn-invoice/txn-invoice.component';
import { TxnProductServiceComponent } from './components/salesforce/txn-product-service/txn-product-service.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { SwitchCompanyComponent } from './components/switch-company/switch-company.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    TransactionComponent,
    ScheduleComponent,
    IntegrationsComponent,
    SettingsComponent,
    ActivityLogComponent,
    HubtxnInvoiceComponent,
    HubtxnDealsComponent,
    HubtxnCustomerComponent,
    HubtxnProductServiceComponent,
    SelectWorkFlowComponent,
    TxnOpportunityComponent,
    TxnCustomerComponent,
    TxnInvoiceComponent,
    TxnProductServiceComponent,
    LoginComponent,
    SpinnerComponent,
    AddCompanyComponent,
    SwitchCompanyComponent,
    SignUpComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxDatatableModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule ,
    MatDialogModule,
    MatCheckboxModule
    ,MatRadioModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SettingsComponent } from './components/settings/settings.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';
import { LoginComponent } from './components/login/login.component';
import { SwitchCompanyComponent } from './components/switch-company/switch-company.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [{
  path: "",
  redirectTo: "/login",
  pathMatch: "full",
},
{
  path: "login",
  component: LoginComponent,
},
{
  path: "sign-up",
  component: SignUpComponent,
},
{
  path: "forgot-password",
  component: ForgotPasswordComponent,
},

{
  path: "dashboard",
  component: DashboardComponent,
},
{
  path: "transaction",
  component: TransactionComponent,

},
{
  path: "schedule",
  component: ScheduleComponent,
},
{
  path: "integration",
  component: IntegrationsComponent,

},
{
  path: "activity",
  component: ActivityLogComponent,

},
{
  path: "settings",
  component: SettingsComponent,
},

{
  path: "add-company",
  component: AddCompanyComponent,
},
{
  path: "switch-company",
  component: SwitchCompanyComponent,
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

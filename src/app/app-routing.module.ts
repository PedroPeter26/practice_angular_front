import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XyzComponent } from './xyz/xyz.component';
import { PadreComponent } from './padre/padre.component';
import { HijoComponent } from './hijo/hijo.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormRegComponent } from './form-reg/form-reg.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'xyz', component: XyzComponent, canActivate: []},
  {path: 'padre', component: PadreComponent, canActivate: [], children: [
    {path: 'hijo', component: HijoComponent, canActivate: []},
  ]},
  {path: 'singin', component: FormRegComponent, canActivate: []},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: NotFoundComponent, canActivate: []},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../../components/login/login.component';
import { RegisterComponent } from './../../components/register/register.component';
import { DashboardComponent } from './../../components/dashboard/dashboard.component';
import { NotLogguedComponent } from './../../components/not-loggued/not-loggued.component';

import { AuthGuard } from './../guards/auth.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'not-logged',
    component: NotLogguedComponent // Página personalizada
  },
  { 
    path: '**', 
    redirectTo: '/not-logged' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

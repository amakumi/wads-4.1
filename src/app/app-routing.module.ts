
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MemberComponent } from './member/member.component';

const appRoutes: Routes =
[
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register/:uid', component: RegisterComponent},
  {path: 'member/:uid', component: MemberComponent},
  
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  declarations: [],
  
  imports:[
    
    CommonModule,
    RouterModule.forRoot(appRoutes,
      {
        enableTracing: true
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

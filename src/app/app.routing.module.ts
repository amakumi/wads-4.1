
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { RegisterComponent } from './admin/register/register.component';
import { MemberComponent } from './member/member.component';

const routes: Routes =
[
    { path: '', redirectTo:'login', pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'member', component: MemberComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(
        routes,
        { enableTracing: true }
      )
    ],
    exports: [
      RouterModule
    ]
  })

export class AppRoutingModule { }
//export const appRoutingModule = RouterModule.forRoot(routes);

//https://jasonwatmore.com/post/2019/04/29/angular-7-tutorial-part-3-add-routing-multiple-pages
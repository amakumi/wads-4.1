import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from './app.routing.module';
import { environment } from '../environment/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AdminModule } from './admin/admin.module';
import { MemberComponent } from './member/member.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ /*RouterModule.forRoot([
                    {
                      path: '',
                      component: LoginComponent
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
                      path: 'verify-email',
                      component: VerifyEmailComponent
                    },
                    {
                      path: 'forgot-password',
                      component: ForgotPasswordComponent
                    },

                    ]),*/
    
                  BrowserModule, FormsModule,  //RouterModule.forRoot(routes),
                  AngularFireModule.initializeApp(environment.firebase),
                  AngularFireAuthModule, AngularFirestoreModule, AngularFireModule, AdminModule,
                  ReactiveFormsModule, AppRoutingModule
                  ],
  declarations: [ AppComponent, LoginComponent, RegisterComponent, MemberComponent ],
  
  /*providers: [
    {
      provide: AuthServiceConfig,
      //useFactory: provideConfig
    }
  ],*/

  bootstrap:    [ AppComponent ]
})

export class AppModule
{ 
  
}

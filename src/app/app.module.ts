import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
//import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { MemberComponent } from './member/member.component';

@NgModule({
  declarations:
  [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MemberComponent
  ],

  imports:
  [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    BrowserModule,
    ReactiveFormsModule,
    AdminModule,
    AppRoutingModule,
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }

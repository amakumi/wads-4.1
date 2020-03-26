import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { AngularFireAuth } from  "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit
{
    loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
});

  constructor(public loginService: AuthService, private router: Router) { 
    
  }

  ngOnInit(): void {

  }

  onClickLogin()
  {
    const {email, password} = this.loginForm.value;
    this.loginService.login(email, password);
  }

}

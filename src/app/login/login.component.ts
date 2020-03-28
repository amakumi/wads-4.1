import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });


  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    const {email, password} = this.loginForm.value;
    this.loginService.emailSignIn(email, password);
  }

}

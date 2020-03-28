import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';

import {LoginService} from '../login.service';
import {async} from 'rxjs/internal/scheduler/async';
import {UserData} from '../user-data';

@Component
({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
    registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    shortDesc: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    public loginService: LoginService,
  ) { }

  ngOnInit(): void
  {

  }

  updateData()
  {
    const userData: UserData = {};
    const fullName = this.registerForm.get('fullName').value;
    const gender = this.registerForm.get('gender').value;
    const number1 = this.registerForm.get('number').value;
    const shortDesc = this.registerForm.get('shortDesc').value;

    window.alert(this.loginService.credential.user.uid);

    userData.fullName = fullName;
    userData.gender = gender;
    userData.number = number1;
    userData.shortDesc = shortDesc;

    this.loginService.updateData(userData);
  }

}

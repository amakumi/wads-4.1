import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';
import {element} from 'protractor';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit
{
  data;
  fullName;
  number;
  email;

  constructor(
    public loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.data = this.loginService.user$.subscribe(
      data => {this.fullName = (data.fullName);
               this.number = (data.number);
               this.email = (data.email); }
    );
  }

  buttonPress() {
    console.log(this.fullName);
    console.log(this.number);
    console.log(this.email);
  }

}

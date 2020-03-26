import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { UserInfo } from '../../userinfo';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit
{
    registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
    //number: new FormControl('', Validators.required),

  });
  constructor( private route: ActivatedRoute, public loginService: AuthService,) { }

  ngOnInit(): void {
    
  }

  
  updateData()
  {
    const userData: UserInfo = {};
    const name = this.registerForm.get('name').value;
    const email = this.registerForm.get('email').value;
  
    window.alert(this.loginService.credential.user.name);
    userData.name = name;
    userData.email = email;
    
    this.loginService.updateData(userData);
  }
}

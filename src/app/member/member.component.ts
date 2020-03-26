
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit
{
    constructor(public loginService: AuthService) { }

    ngOnInit(): void {}

}
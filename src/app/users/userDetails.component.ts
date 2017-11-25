import { Component, OnInit } from '@angular/core'
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { IUsers } from './users';

@Component({
    templateUrl: './userDetails.component.html',
    styleUrls: ['./userDetails.component.css']
})
export class UserDetailsComponent implements OnInit {

    currentUser: IUsers;

    constructor(
        private _userService: UsersService,
        private _router: Router
    ) { }

    ngOnInit() {
        
    }
}
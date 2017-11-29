import { Component, OnInit, Input } from '@angular/core'
import { UsersService } from './users.service';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { IUsers } from './users';

@Component({
    templateUrl: './userDetails.component.html',
    styleUrls: ['./userDetails.component.css']
})
export class UserDetailsComponent implements OnInit {

    currentUser: any
    @Input() userId;

    constructor(
        private _userService: UsersService,
        private _router: Router,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this._route.data.forEach((data) => {
            this.currentUser = data['user']
        })

        console.log(this.currentUser)
    }
}
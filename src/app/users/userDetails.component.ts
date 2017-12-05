import { Component, OnInit, Input } from '@angular/core'
import { UsersService } from './users.service';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { IUsers } from './users';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './userDetails.component.html',
    styleUrls: ['./userDetails.component.css']
})
export class UserDetailsComponent implements OnInit {

    currentUser: any;
    updatedUser: any;
    @Input() userId;
    userGroupForm: FormGroup;
    pageTitle: string = "";
    id: number;

    constructor(
        private _userService: UsersService,
        private _router: Router,

        private _route: ActivatedRoute,
        private _fb: FormBuilder
    ) { 
        
     }

    ngOnInit() {
        var currentUserSub = this._route.paramMap.switchMap(
            (params: ParamMap) => {
                this.id = +params.get('id');
                console.log(this.id);
                return this._userService.getUser(this.id);
            }
        )

            currentUserSub.subscribe(x => {
                this.currentUser = x;
                console.log(x);
            })

            this.userGroupForm = this._fb.group({
                "userName": ['', Validators.required],
                "firstName": ['', Validators.required],
                "lastName": ['', Validators.required],
                "emailAddress": ['', Validators.required],
                //"address": [this.currentUser.address, Validators.required]
            })
        
        //this.pageTitle = this.currentUser.userName;
        
        
    }

    updateUser() {
        if (this.userGroupForm.valid) {
            console.log(this.userGroupForm.value)
        }
    }
}
import { Component, OnInit, Input} from '@angular/core'
import { UsersService } from './users.service';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { IUsers } from './users';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../login/auth.service';

@Component({
    templateUrl: './userDetails.component.html',
    styleUrls: ['./userDetails.component.css']
})
export class UserDetailsComponent implements OnInit{

    currentUser: IUsers;
    updatedUser: any;
    userGroupForm: FormGroup;
    pageTitle: string = "";
    id: number;

    constructor(
        private _userService: UsersService,
        private _router: Router,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _fb: FormBuilder
    ) { 
        this.userGroupForm = this._fb.group({
            "userName": ['', Validators.required],
            "firstName": ['', Validators.required],
            "lastName": ['', Validators.required],
            "emailAddress": ['', Validators.required],
            "country": ['', Validators.required],
            "zipcode": ['', Validators.required],
            "city": ['', Validators.required],
            "street": ['', Validators.required],
            "houseNo": ['', Validators.required],
        })
     }

    ngOnInit() {
        var currentUserSub = this._route.paramMap.switchMap(
            (params: ParamMap) => {
                this.id = +params.get('id');
                if (this.id > 0) {
                    return this._userService.getUser(this.id);
                } else {
                    return this._userService.getSelf();
                }
            }
        )

            currentUserSub.subscribe(x => {
                this.currentUser = x;
                this.userGroupForm.setValue({
                    'userName': x.userName,
                    'firstName': x.firstName,
                    'lastName': x.lastName,
                    'emailAddress': x.email,
                    'country': x.address,
                    'zipcode': x.address,
                    'city': x.address,
                    'street': x.address,
                    'houseNo': x.address,
                    
                })
            }, error => { console.log('Hiba az adatok lekérésénél...');})
        
        //this.pageTitle = this.currentUser.userName;
        
        
    }

    updateUser() {
        if (this.userGroupForm.valid) {
            this._userService.updateUser(this.currentUser.id, this.userGroupForm.value)
                .subscribe((resp) => {
                    this._router.navigate(['users']);
                }, error => { console.log('Sikertelen mentés!') });
        }
    }

    cancel() {
        this._router.navigate(['users']);
    }
}
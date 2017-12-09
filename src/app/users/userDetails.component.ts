import { Component, OnInit, Input} from '@angular/core'
import { UsersService } from './users.service';
import { Router, ActivatedRoute, ParamMap  } from '@angular/router';
import { IUsers, IAddress } from './users';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { AuthService } from '../login/auth.service';
import { DISABLED } from '@angular/forms/src/model';

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
            "userName": [{value:'', disabled: true}, Validators.required],
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
                if(x.userName) {
                    this.userGroupForm.patchValue({
                        'userName': x.userName
                    })
                }
                if(x.firstName) {
                    this.userGroupForm.patchValue({
                        'firstName': x.firstName
                    })
                }
                if(x.lastName) {
                    this.userGroupForm.patchValue({
                        'lastName': x.lastName
                    })
                }
                if(x.email) {
                    this.userGroupForm.patchValue({
                        'emailAddress': x.email
                    })
                }
                if(x.address) {
                    if(x.address.country) {
                        this.userGroupForm.patchValue({
                            'country': x.address.country
                        })
                    }
                    if(x.address.zipcode) {
                        this.userGroupForm.patchValue({
                            'zipcode': x.address.zipcode
                        })
                    }
                    if(x.address.city) {
                        this.userGroupForm.patchValue({
                            'city': x.address.city
                        })
                    }
                    if(x.address.street) {
                        this.userGroupForm.patchValue({
                            'street': x.address.street
                        })
                    }
                    if(x.address.houseNo) {
                        this.userGroupForm.patchValue({
                            'houseNo': x.address.houseNo
                        })
                    }
                }
                
                
            }, error => { console.log('Hiba az adatok lekérésénél...');})
        
        //this.pageTitle = this.currentUser.userName;
        
        
    }

    updateUser() {
        var updateUser;
        var address: IAddress;
        address = {
            country: this.userGroupForm.value.country,
            zipcode: this.userGroupForm.value.zipcode,
            city: this.userGroupForm.value.city,
            street: this.userGroupForm.value.street,
            houseNo: this.userGroupForm.value.houseNo
        }
        updateUser = {
            userName: this.currentUser.userName,
            firstName: this.userGroupForm.value.firstName,
            lastName: this.userGroupForm.value.lastName,
            email: this.userGroupForm.value.emailAddress,
            address: address
        }
        if (this.userGroupForm.valid) {
            if(this._authService.isAdmin()) {
                this._userService.updateUser(this.id, updateUser)
                .subscribe((resp) => {
                    if(this._authService.isAdmin()) {
                        this._router.navigate(['users']);
                    } else {
                        this._router.navigate(['transports']);
                    }
                    
                }, error => { console.log('Sikertelen mentés!') });
            } else {
                this._userService.updateSelf(updateUser)
                    .subscribe((resp) => {
                        if(this._authService.isAdmin()) {
                            this._router.navigate(['users']);
                        } else {
                            this._router.navigate(['transports']);
                        }
                        
                    }, error => { console.log('Sikertelen mentés!') });
            }
        }
    }

    cancel() {
        if(this._authService.isAdmin()) {
            this._router.navigate(['users']);
        } else {
            this._router.navigate(['transports']);
        }
    }
}
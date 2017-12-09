import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { IRegisterModel } from './register.model';

@Component({
    templateUrl: './userCreate.component.html',
    styleUrls: ['./userCreate.component.css']
})
export class UserCreateComponent implements OnInit {

    registerInvalid = false;
    errorMessage: string;

    constructor(
        private _router: Router,
        private _userService: UsersService
    ) { }

    ngOnInit() {

    }

    cancelRegistration() {
        this._router.navigate(['login']);
    }

    registerUser(formValues) {

        if (formValues.userName.length <= 4) {
            this.errorMessage = 'A felhasználónév legalább 4 karakter hosszú legyen!'
            this.registerInvalid = true;
            return 0;
        }
        
        this._userService.createUser(formValues).subscribe(
            resp => {
                if(resp.status == 'VALIDATION_ERROR') {
                    this.errorMessage = 'Sikertelen regisztráció!'
                    this.registerInvalid = true;
                } else {
                    this._router.navigate(['login']);
                }
            }
        );
    }

    checkPasswordMatching(password, checkPassword): boolean {
        if (password === checkPassword) {
            return true;
        }
        return false;
    }
}
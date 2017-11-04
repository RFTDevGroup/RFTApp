import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginInvalid = false;

  constructor(
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  login(formValues) {
    this._authService.loginUser(
      formValues.userName,
      formValues.password
    )
    .subscribe(resp => {
      if(!resp) {
        this.loginInvalid = true;
      } else {
        this._router.navigate(['users'])

      }
    })
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
    selector: "nav-bar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    logout() {
        this._authService.logout();
        this._router.navigate(['login']);
    }

    isLoggedIn() {
        return this._authService.isAuthenticated();
    }
}
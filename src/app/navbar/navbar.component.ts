import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "nav-bar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {

    userName: string;

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        
    }

    logout() {
        this._authService.logout();
        this._router.navigate(['login']);
    }

    isLoggedIn() {
        return this._authService.isAuthenticated();
    }

    isAdmin() {
        return this._authService.isAdmin();
    }

    getUserName() {
        return this._authService.getUsername();
    }

    getSelf() {
        var id = 0;
        this._router.navigate(['/user', id]);
    }
}
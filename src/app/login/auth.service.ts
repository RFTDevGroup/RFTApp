import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';


@Injectable()
export class AuthService {
    currentAuthorities: any

    constructor(
        private _http: Http,
        //localStorage: LocalStorageService,
        private _router: Router){
        
    }

    getUsername() {
        return sessionStorage.getItem("userName");
    }


    getPassword() {
        return sessionStorage.getItem("password");
    }

    loginUser(username: string,
    password: string) {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(username+ ':' +password)
        });
        let options = new RequestOptions({
            headers: headers
        });
        let loginInfo = {
            username: username, 
            password: password
        };

        return this._http.get('http://localhost:8080/transporthub/api/login/', options)
        .do(resp => {
            if(resp) {
                this.currentAuthorities = resp;
                sessionStorage.setItem("authority", JSON.stringify(resp));
                sessionStorage.setItem("userName", username);
                sessionStorage.setItem("password", password);
                this.setAdmin()
            }
        }).catch(error => {
            return Observable.of(false);
        }) 

    }

    isAuthenticated(){
        if (sessionStorage.getItem("userName") == null 
            || sessionStorage.getItem("password") == null) {
                return false;
        }
        return true;
    }

    setAdmin() {
        var auth = this.currentAuthorities;
        if (auth == null) {
            return false;
        }
        var authBody = auth.json().authorities;
        for(let i of authBody) {
            if (i.authority == 'ROLE_ADMIN') {
                sessionStorage.setItem("role", "true");
            }
        }
    }

    isAdmin() {
        var auth = sessionStorage.getItem("role");
        if (auth === "true") {
            return true;
        }
        return false;
    }

    //TODO
    logout(){
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("role");
    }
}

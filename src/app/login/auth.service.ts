import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    currentAuthorities: any
    private username;
    private password;
   

    constructor(
        private _http: Http,
        localStorage: LocalStorageService,
        private _router: Router){
        
    }

    getUsername() {
        return localStorage.getItem("userName");
    }



    getPassword() {
        return localStorage.getItem("password");
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

        this.username = username;
        this.password = password;

        localStorage.setItem("userName", this.username);
        localStorage.setItem("password", this.password);

        return this._http.get('http://localhost:8080/transporthub/api/login/', options)
        .do(resp => {
            if(resp) {
                localStorage.setItem("authority", JSON.stringify(resp));
            }
        }).catch(error => {
            return Observable.of(false);
        }) 

    }

    isAuthenticated(){
        if (localStorage.getItem("userName") == null 
            || localStorage.getItem("password") == null) {
                return false;
        }
        return true;
    }

    //TODO
    checkAuthenticationStatus() {

    }

    //TODO
    updateCurrentUser() {

    }

    //TODO
    logout(){
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
    }
}

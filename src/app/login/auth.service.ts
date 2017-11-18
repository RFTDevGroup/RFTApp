import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { ILogin, ILoginUser } from './login.model'
import * as $ from 'jquery'

@Injectable()
export class AuthService {
    currentUser: any
    private username;
    private password;

    constructor(private _http: Http){

    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
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

        return this._http.get('http://localhost:8080/transporthub/api/login', options)
        .do(resp => {
            if(resp) {
                this.currentUser = <any>resp.json().user;
            }
        }).catch(error => {
            return Observable.of(false);
        }) 

    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    //TODO
    checkAuthenticationStatus() {

    }

    //TODO
    updateCurrentUser() {

    }

    //TODO
    logout(){

    }
}

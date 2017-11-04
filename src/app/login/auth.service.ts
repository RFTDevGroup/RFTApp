import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { ILogin, ILoginUser } from './login.model'
import * as $ from 'jquery'

@Injectable()
export class AuthService {
    currentUser: any
    username;
    password;

    constructor(private _http: Http){

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
                console.log(resp)
            }
        }).catch(error => {
            return Observable.of(false);
        }) 
/*         $.ajax({
            url: 'http://localhost:8080/transporthub/api/login',
            type: 'get',
            headers: {
                'authorization': 'Basic ' + btoa(username + ':' + password)
            }
        }).done(data => {
            console.log(data);
        })

        return Observable.of(false) */
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

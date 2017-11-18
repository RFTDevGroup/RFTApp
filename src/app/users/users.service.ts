import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IUsers } from "./users";
import { AuthService } from '../login/auth.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class UsersService {
    private _usersUrl = 'http://localhost:8080/transporthub/api/users';

    constructor(
        private _http: Http,
        private _authService: AuthService){ }

    getUsers(): Observable<IUsers> {

        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(this._usersUrl, options)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUser(id: number): Observable<IUsers> {
        return this.getUsers().find(user => user.id === id);
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status},
            error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
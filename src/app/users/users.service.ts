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
import { IRegisterModel } from './register.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UsersService {

    constructor(
        private _http: Http,
        private _authService: AuthService){ }

    getUsers(): Observable<IUsers[]> {

        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(environment.baseAddress + '/api/users', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* Waiting on REST implementation
    
    getUser(id: number): Observable<IUsers> {
        let headers = new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(environment.baseAddress + '/api/users/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);

    }*/

    createUser(newUser) {    
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.post(environment.baseAddress + '/api/register', newUser, options)
            .map((resp: Response) => { return resp.json() })
            .catch(this.handleError);
    }

    updateUser(user) {
        let headers = new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
                headers: headers
        });

        return this._http.put(environment.baseAddress + '/api/user/update', user, options)
            .map((resp: Response) => { return resp.json() })
            .catch(this.handleError);
    }

    deleteUser(id: number) {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.delete(environment.baseAddress + '/api/user/' + id, options)
            .map((resp: Response) => { return resp.json() })
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status},
            error message is: ${err.message}`;
        }
        return Observable.throw(errorMessage);
    }
}
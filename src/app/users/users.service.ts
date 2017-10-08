import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IUsers } from "./users";

@Injectable()
export class UsersService {
    private _usersUrl = 'localhost:4200/api/users';

    constructor(private _http: HttpClient){ }

    getUsers(): Observable<IUsers[]> {
        return this._http.get<IUsers[]>(this._usersUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUser(id: number): Observable<IUsers> {
        return this.getUsers()
            .map((users: IUsers[]) => users.find(p => p.id === id));
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
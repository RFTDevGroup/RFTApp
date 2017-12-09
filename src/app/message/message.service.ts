import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Request, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { IMessage } from './message';

@Injectable()
export class MessageService { 
    constructor(
        private _http: Http,
        private _router: Router,
        private _authService: AuthService
    ) {    }

    getAllMessages(): Observable<IMessage[]> {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(environment.baseAddress + '/api/messages/', options)
            .map((response: Response) => { return response.json() }); 
    }

    getUnreadMessages(): Observable<IMessage[]> {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(environment.baseAddress + '/api/messages/unread', options)
            .map((response: Response) => { return response.json() }); 
    }  
}
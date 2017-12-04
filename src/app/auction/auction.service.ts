import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { IBid, IBidMinimal, IBidder } from './auction';
import { ITransport } from '../transport/transport';

@Injectable()
export class AuctionService {

    constructor(
        private _authService: AuthService,
        private _http: Http) {    }

    getAuctions(): Observable<IBid[]> {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });

        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(environment.baseAddress + "/api/auction/", options)
            .map((response: Response) => { return response.json()});
    }

    bidOnAuction(transportId: number, bid: IBidMinimal) {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });

        let options = new RequestOptions({
            headers: headers
        });

        return this._http.post(environment.baseAddress + '/api/'+ transportId + '/bid', options)
            .map((response: Response) => { return response.json() });
    }
}
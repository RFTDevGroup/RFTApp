import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { ITransport, ITransportResponse, ITransportCreate, ITransportViewModel, IBidValue } from './transport';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class TransportService {

    bid: IBidValue;
    constructor(
        private _http: Http,
        private _authService: AuthService) { }

    getTransports(page: number): Observable<ITransportResponse> {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });

        let params = new HttpParams();
        params.append("page", page.toString());

        let options = new RequestOptions({
            headers: headers,
            params: params
        });

        return this._http.get(environment.baseAddress + '/api/transport/', options)
            .map((resp: Response) => { return resp.json() })
            .catch(this.handleError);
    }

    getTransport(id: number): Observable<ITransportViewModel> {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(environment.baseAddress + '/api/transport/' + id, options)
            .map((response: Response) => { return response.json() })
            .catch(this.handleError);
    }

    createTransport(transport: ITransportCreate) {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.post(environment.baseAddress + '/api/transport/new', transport, options)
            .map((response: Response) => { return response })
            .catch(this.handleError);
    }

    deleteTransport(id: number) {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.delete(environment.baseAddress + '/api/transport/' + id, options)
            .map((response: Response) => { return response })
            .catch(this.handleError);
    }

    deleteTransportByAdmin(id: number) {
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.delete(environment.baseAddress + '/api/transport/' + id + '/admin', options)
            .map((response: Response) => { return response })
            .catch(this.handleError);
    }

    bidOnTransport(id: number, value: IBidValue) {
        console.log(id);
        console.log(value);
        let headers =  new Headers({
            'Authorization': 'Basic ' + btoa(this._authService.getUsername() + ':' + this._authService.getPassword())
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.post(environment.baseAddress + '/api/auction/transport/'+id+'/bid', value, options)
            .map((response: Response) => { return response })
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
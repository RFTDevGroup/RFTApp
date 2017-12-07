import { Component } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { TransportService } from './transport.service';
import 'rxjs/add/operator/switchMap';
import { ITransportViewModel } from './transport';

@Component({
    templateUrl: './transportDetails.component.html',
    styleUrls: ['./transportDetails.component.css']
})
export class TransportDetailsComponent {

    id: any;
    transport: ITransportViewModel;
    transportEntity: any;
    errorMessage: string;
    bidValue = 0;
    bidInvalid = false;

    constructor(
        private _authService: AuthService,
        private _transportService: TransportService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.transportEntity = this._route.paramMap.switchMap((params: ParamMap) => {
            this.id = +params.get('id');
            return this._transportService.getTransport(this.id);
        }).subscribe((resp) => {
            if (resp) {
                this.transport = resp;
                this.bidValue = this.transport.currentPrice;
            }
        }, error => { this.errorMessage = error});

        
    }

    return() {
        this._router.navigate(['transports']);
    }

    makeBid() {
        if (this.bidValue < this.transport.currentPrice) {
            this._transportService.bidOnTransport(this.id, this.bidValue)
                .subscribe(resp => {
                    if (resp) {
                        this._router.navigate(['transports']);
                    }});
        } else {
            this.errorMessage = "Csak kisebb összeg adható meg!";
            this.bidInvalid = true;
        }
    }
}
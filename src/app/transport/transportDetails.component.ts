import { Component } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { TransportService } from './transport.service';
import 'rxjs/add/operator/switchMap';
import { ITransportViewModel, IBidValue } from './transport';

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
    newBidValue = 0;
    bidInvalid = false;
    bidAmount: IBidValue;
    lowestBidder: string;

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
                if(this.getLowestBidder()){
                    this.lowestBidder = this.getLowestBidder().bidder.userName;
                } else {
                    this.lowestBidder = this.transport.owner.userName;
                }
                this.dateIsOverdue();
                
            }
        }, error => { this.errorMessage = error});
    }

    getLowestBidder() {
        return this.transport.bids[this.transport.bids.length - 1];
    }

    dateIsOverdue() {
        if (this.transport) {
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth() + 1;
            var currentDay = currentDate.getDate();
            var currentDateTime = currentYear + '-' + currentMonth + '-' + currentDay
            var transportDateTime = 
                this.transport.timeOfLoad.year + '-' + this.transport.timeOfLoad.monthValue + '-' + this.transport.timeOfLoad.dayOfMonth;
            var diff = (Date.parse(currentDateTime) - Date.parse(transportDateTime)) / (1000*60*60*24);
            if (diff < 0) {
                return true;
            } else {
                return false;
            }
        }
        return true;
        

    }

    return() {
        this._router.navigate(['transports']);
    }

    isOwnTransport(owner) {
        if (owner && owner.userName == this._authService.getUsername()) {
            return false;
        } else {
            return true;
        }
    }

    makeBid() {
        if (this.newBidValue == 0) {
            this.errorMessage = "Csak nullától nagyobb összeg adható meg!";
            this.bidInvalid = true;
            return 0;
        }
        if (this.newBidValue >= this.transport.currentPrice) {
            this.errorMessage = "Csak kisebb összeg adható meg!";
            this.bidInvalid = true;
            return 0;
        } 
        if (this.getLowestBidder() && this.getLowestBidder().bidder.userName == this._authService.getUsername())
        {
            this.errorMessage = "Már Öné a legkisebb licit!"
            this.bidInvalid = true;
            return 0;
        }
        this.bidAmount = {
            amount: this.newBidValue
        }
        this._transportService.bidOnTransport(this.id, this.bidAmount)
            .subscribe(resp => {
                if (resp) {
                    this._router.navigate(['transports']);
                }});
    }
}
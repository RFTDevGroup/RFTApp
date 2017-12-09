import { Component, OnInit } from '@angular/core';
import { TransportService } from './transport.service';
import { ITransport, ITransportResponse } from './transport';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
    templateUrl: './transport-list.component.html',
    styleUrls: ['./transport-list.component.css']
})
export class TransportListComponent implements OnInit{
    pageTitle: string = 'Transport List';
    errorMessage: string;
    listPageNumber: number = 0;

    transports: ITransport[];
    response: ITransportResponse;

    constructor (
        private _transportService: TransportService,
        private _router: Router,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.listTransports();
    }

    listTransports() {
        this._transportService.getTransports(this.listPageNumber)
        .subscribe(response => {
            this.transports = response.content;
        },
        error => { console.log('Lista sikertelen megjelenítése')});
    }

    transportDetails(id: number) {
        this._router.navigate(['/transport', id]);
    }

    deleteTransport(id: number) {
        if (this.isAdmin()) {
            this._transportService.deleteTransportByAdmin(id)
            .subscribe(response => {
                this.listTransports();
            },
            error => { console.log('Sikertelen törlés')});
        } else {
        this._transportService.deleteTransport(id)
            .subscribe(response => {
                this.listTransports();
            },
            error => { console.log('Sikertelen törlés')});
        }
    }

    isOwnTransport(owner) {
        if (owner == this._authService.getUsername()) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin() {
        return this._authService.isAdmin();
    }

    isCurrentHighestBidder(name) {
        if (name == this._authService.getUsername()) {
            return 'green';
        }
    }

    
    createTransport() {
        this._router.navigate(['transport/create']);
    }


}
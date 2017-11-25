import { Component, OnInit } from '@angular/core';
import { TransportService } from './transport.service';
import { ITransport, ITransportResponse } from './transport';

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
        private _transportService: TransportService
    ) { }

    ngOnInit() {
        this.listTransports();
    }

    listTransports() {
        this._transportService.getTransports(this.listPageNumber)
        .subscribe(response => {
            console.log(response)
            this.transports = response.content;
            console.log(this.transports)
        })
    }


}
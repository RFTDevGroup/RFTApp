import { Component, OnInit } from '@angular/core';
import { AuctionService } from './auction.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms/src/form_builder';
import { IBid, IMinimal, IBidMinimal } from './auction';

@Component({
    templateUrl: './auction-list.component.html',
    styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
    pageTitle = "Current auctions";
    auctions: IBid[];
    errorMessage: string = "";

    constructor (
        private _auctionService: AuctionService,
        private _router: Router
    ) {

    }

    ngOnInit() {
        this.listAuctions();
    }

    listAuctions() {
        this._auctionService.getAuctions()
        .subscribe(resp => {
            this.auctions = resp;
        }, error => { this.errorMessage = "Nem sikerült a lista megjelenítése!" });
    }
}
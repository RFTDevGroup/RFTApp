import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuctionService } from './auction.service';
import { AuctionListComponent } from './auction-list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'auction', component: AuctionListComponent }
          ]),
          FormsModule,
          ReactiveFormsModule,
          CommonModule,
    ],
    exports: [],
    declarations: [
        AuctionListComponent
    ],
    providers:[
        AuctionService
    ]
})
export class AuctionModule {

}
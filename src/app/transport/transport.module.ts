import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransportService } from './transport.service';
import { TransportListComponent } from './transport-list.component';

@NgModule({
    imports:[
        RouterModule.forChild([
            { path: 'transport', component: TransportListComponent }
          ]),
          FormsModule,
          CommonModule,
    ],
    declarations: [
        TransportListComponent
    ],
    providers: [
        TransportService
    ]
})
export class TransportModule {

}
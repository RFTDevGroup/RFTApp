import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransportService } from './transport.service';
import { TransportListComponent } from './transport-list.component';
import { TransportCreateComponent } from './transportCreate.component';

@NgModule({
    imports:[
        RouterModule.forChild([
            { path: 'transport/create', component: TransportCreateComponent },
            { path: 'transport', component: TransportListComponent }
          ]),
          FormsModule,
          ReactiveFormsModule,
          CommonModule,
    ],
    declarations: [
        TransportListComponent,
        TransportCreateComponent
    ],
    providers: [
        TransportService
    ]
})
export class TransportModule {

}
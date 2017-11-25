import { Component, OnInit } from '@angular/core'
import { TransportService } from './transport.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './transportCreate.component.html',
    styleUrls: ['./transportCreate.component.css']
})
export class TransportCreateComponent implements OnInit {

    transportCreateForm: FormGroup;

    constructor(
        private _transportService: TransportService,
        private _fb: FormBuilder
    ) {
        this.transportCreateForm = this._fb.group({
            "name": ['', Validators.required],
            "weight": ['', Validators.required],
            "width": ['', Validators.required],
            "height": ['', Validators.required],
            "depth": ['', Validators.required],
            "description": [''],

            "fromCountry": ['', Validators.required],
            "fromZipcode": ['', Validators.required],
            "fromCity": ['', Validators.required],
            "fromStreet": ['', Validators.required],
            "fromNumber": ['', Validators.required]
        });
    }

    ngOnInit() {
        
    }

    createTransport() {

    }
}
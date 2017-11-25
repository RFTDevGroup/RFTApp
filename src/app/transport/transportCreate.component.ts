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

            "FromCountry": ['', Validators.required],
            "FromZipcode": ['', Validators.required],
            "FromCity": ['', Validators.required],
            "FromStreet": ['', Validators.required],
            "FromNumber": ['', Validators.required],
            "FromDate": ['', Validators.required],
            "FromTime": ['', Validators.required],

            "ToCountry": ['', Validators.required],
            "ToZipcode": ['', Validators.required],
            "ToCity": ['', Validators.required],
            "ToStreet": ['', Validators.required],
            "ToNumber": ['', Validators.required],
            "ToDate": ['', Validators.required],
            "ToTime": ['', Validators.required]
        });
    }

    ngOnInit() {
        
    }

    createTransport() {
        console.log(this.transportCreateForm)
    }
}
import { Component, OnInit } from '@angular/core'
import { TransportService } from './transport.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITransport, IAddress, ITransportCreate, ICargo } from './transport';
import { Router } from '@angular/router';

@Component({
    templateUrl: './transportCreate.component.html',
    styleUrls: ['./transportCreate.component.css']
})
export class TransportCreateComponent implements OnInit {

    transportCreateForm: FormGroup;

    mouseoverSubmit: boolean;

    constructor(
        private _transportService: TransportService,
        private _fb: FormBuilder,
        private _router: Router
    ) {
        this.transportCreateForm = this._fb.group({
            "name": ['', Validators.required],
            "weight": ['', Validators.required],
            "width": ['', Validators.required],
            "height": ['', Validators.required],
            "depth": ['', Validators.required],
            "description": [''],
            "startingPrice": ['', Validators.required],

            "FromCountry": ['', Validators.required],
            "FromZipcode": ['', Validators.required],
            "FromCity": ['', Validators.required],
            "FromStreet": ['', Validators.required],
            "FromNumber": ['', Validators.required],
            "FromDate": ['', Validators.required],

            "ToCountry": ['', Validators.required],
            "ToZipcode": ['', Validators.required],
            "ToCity": ['', Validators.required],
            "ToStreet": ['', Validators.required],
            "ToNumber": ['', Validators.required],
            "ToDate": ['', Validators.required]
        });
    }

    ngOnInit() {
        
    }

    cancelCreate() {
        this._router.navigate(['transport']);
    }

    createTransport() {
        var newTransport: ITransportCreate;
        var cargo: ICargo;
        var FromAddress: IAddress;
        var ToAddress: IAddress;

        FromAddress = {
            country: this.transportCreateForm.value.FromCountry,
            zipcode: this.transportCreateForm.value.FromZipcode,
            city: this.transportCreateForm.value.FromCity,
            street: this.transportCreateForm.value.FromStreet,
            houseNo: this.transportCreateForm.value.FromNumber
        }

        ToAddress = {
            country: this.transportCreateForm.value.ToCountry,
            zipcode: this.transportCreateForm.value.ToZipcode,
            city: this.transportCreateForm.value.ToCity,
            street: this.transportCreateForm.value.ToStreet,
            houseNo: this.transportCreateForm.value.ToNumber
        }
        
        cargo = {
            name: this.transportCreateForm.value.name,
            description: this.transportCreateForm.value.description,
            weight: this.transportCreateForm.value.weight,
            width: this.transportCreateForm.value.width,
            height: this.transportCreateForm.value.height,
            depth: this.transportCreateForm.value.depth
        }

        newTransport = {
            cargo: cargo,
            placeOfLoad: FromAddress,
            placeOfUnload: ToAddress,
            timeOfLoad: this.transportCreateForm.value.FromDate,
            timeOfUnload: this.transportCreateForm.value.ToDate,
            startingPrice: this.transportCreateForm.value.startingPrice
        }

        this._transportService.createTransport(newTransport)
            .subscribe(response => {
                if (response) {
                    console.log('Sikeres hozzáadás!');
                    this._router.navigate(['transport']);
                }
            }, error => {console.log(error)})

    }
}
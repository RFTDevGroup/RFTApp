import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { IMessage } from './message';

@Component({
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    
    messages: IMessage[];
    errorMessage: string;
    toggleOption = true;
    buttonText = 'Olvasatlan';

    constructor(
        private _messageService: MessageService,
        private _router: Router,
        private _authService: AuthService) 
    {
        this.getMessages();
    }

    toggleList() {
        this.toggleOption = !this.toggleOption;
    }

    getMessages() {
        if (this.toggleOption == true) {
            this._messageService.getAllMessages()
            .subscribe(resp => {
                this.messages = resp.reverse();
                for (var i of this.messages) {
                    if (i.sender == null) {
                        i.sender = 'Rendszer';
                    }
                }
                this.buttonText = 'Olvasatlan';
            }, error => { this.errorMessage = 'Nem sikerült az adatok lekérése a szerverről'});
        } else {
            this._messageService.getUnreadMessages()
                .subscribe(resp => {
                    this.messages = resp.reverse();
                    for (var i of this.messages) {
                        if (i.sender == null) {
                            i.sender = 'Rendszer';
                        }
                    }
                    this.buttonText = 'Minden üzenet';
                }, error => { this.errorMessage = 'Nem sikerült az adatok lekérése a szerverről'});
        }
    }

    toggleButton() {
        this.toggleOption = !this.toggleOption
        this.getMessages();
    }

    isUnread(read) {
     if(!read) {
         return "bold";
     } else {
         return "normal";
     }
    }

}
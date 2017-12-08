import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([
            { path: 'messages', component: MessageComponent }
        ])
    ],
    declarations: [
        MessageComponent
    ],
    providers: [
        MessageService
    ]
})
export class MessageModule {}
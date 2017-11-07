import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list.component';
import { RouterModule } from '@angular/router';
import { UsersService } from "./users.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'users', component: UsersListComponent}
    ]),
    FormsModule,
    CommonModule,
  ],
  declarations: [
    UsersListComponent,
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }

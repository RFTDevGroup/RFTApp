import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list.component';
import { RouterModule } from '@angular/router';
import { UsersService } from "./users.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login/auth.service';
import { UserCreateComponent } from './userCreate.component';
import { UserDetailsComponent } from './userDetails.component';
import { UserResolver } from './user-resolver.service';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'users/:id', component: UserDetailsComponent,
      resolve: {user: UserResolver}},
      { path: 'users', component: UsersListComponent },
      { path: 'create', component: UserCreateComponent }
    ]),
    FormsModule,
    CommonModule,
  ],
  declarations: [
    UsersListComponent,
    UserCreateComponent,
    UserDetailsComponent
  ],
  providers: [
    UsersService,
    AuthService,
    UserResolver
  ]
})
export class UsersModule { }

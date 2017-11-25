import { Component, OnInit } from '@angular/core';

import { IUsers } from "./users";
import { UsersService } from "./users.service";
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  pageTitle: string = 'User List';
  errorMessage: string;

  

  filteredUsers: IUsers[];
  users: IUsers[] = [];

  constructor(
    private _usersService: UsersService,
    private _authService: AuthService) { }

  _listFilter: string;
    get listFilter(): string {
      return this._listFilter
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredUsers = this.listFilter ? 
        this.performFilter(this.listFilter) : this.users;
  }

  performFilter(filterBy: string): IUsers[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((
      users: IUsers) => users.lastName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this._usersService.getUsers()
    .subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    },
    error => this.errorMessage = <any>error);
  }

  deleteUser (id: number){
    this._usersService.deleteUser(id)
      .subscribe(resp => {
        if (!resp) {
          console.log('Sikertelen törlés');
        } else {
          this.getUsers();
        }
      })
  }

}

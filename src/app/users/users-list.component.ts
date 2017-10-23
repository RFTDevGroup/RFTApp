import { Component, OnInit } from '@angular/core';

import { IUsers } from "./users";
import { UsersService } from "./users.service";

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  pageTitle: string = 'User List';
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredUsers = this.listFilter ? 
      this.performFilter(this.listFilter) : this.users;
  }

  filteredUsers: IUsers[];
  users: IUsers[] = [];

  constructor(private _usersService: UsersService) { }

  performFilter(filterBy: string): IUsers[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.users.filter((
      users: IUsers) => users.firstName.toLocaleLowerCase().indexOf(filterBy) != -1);
  }

  ngOnInit(): void {
    this._usersService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.filteredUsers = this.users;
      },
      error => this.errorMessage = <any>error);
  }

}

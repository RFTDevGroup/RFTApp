import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from './users.service';

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private _usersService: UsersService) {

    }
    resolve(route: ActivatedRouteSnapshot) {
        return this._usersService.getUser(route.params['id']);
    }
}
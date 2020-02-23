import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/user.class';
import { List } from '../models/list.interface';
@Injectable()
export class UsersListResolver implements Resolve<any> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<List<User>> {
    return this.usersService.getUsers(route.queryParams);
  }
}

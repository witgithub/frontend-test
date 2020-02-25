import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../models/user.class';
@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.usersService.getUserById(route.params.id);
  }
}

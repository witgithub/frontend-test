import { Injectable } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { usersMock } from './users.mock';
import { User } from '../models/user.class';
import { map, delay } from 'rxjs/operators';
import { List } from '../models/list.interface';

@Injectable()
export class UsersService {


  constructor(private activatedRoute: ActivatedRoute) {

  }
 
  private usersMock: User[] = usersMock.map((user) => new User(
    user.id,
    user.avatarUrl,
    user.name,
    user.company,
    user.email,
    user.phone,
    user.address,
    user.createdAt,
    user.tags,
  ));

  users = new BehaviorSubject({
    totalCount: usersMock.length,
    items: this.usersMock,
    pageCount: usersMock.length / 1,
  });

  // public usersList$: BehaviorSubject<List<User>> = new BehaviorSubject<List<User>>({
  //   totalCount: this.usersMock.length,
  //   items: [],
  //   pageCount: this.usersMock.length / params.page
  // });

  private paginate<T>(list: T[], params: Params) {
    console.log(
      (params.page - 1) * params.limit,
      params.page === 0 ? params.limit : params.page * params.limit,
    );

    return list.slice(
      (params.page - 1) * params.limit,
      params.page === 0 ? params.limit : params.page * params.limit,
    );
  }

  public getUsers(params: Params): Observable<List<User>> {
    const paginatedUsers: User[] = this.paginate(this.usersMock, params);
    console.log(paginatedUsers);
    return of(paginatedUsers).pipe(
      delay(100),
      map((response: User[]) => {
        const users: User[] = response.map(
          (user: User) =>
            new User(
              user.id,
              user.avatarUrl,
              user.name,
              user.company,
              user.email,
              user.phone,
              user.address,
              user.createdAt,
              user.tags,
            ),
        );
        return {
          totalCount: this.usersMock.length,
          items: users,
          pageCount: this.usersMock.length / params.page,
        };
      }),
    );
  }

  public createUser(user: User): void {
    this.usersMock.unshift(
      new User(
        user.id,
        user.avatarUrl,
        user.name,
        user.company,
        user.email,
        user.phone,
        user.address,
        user.createdAt,
        user.tags,
      ),
    );
  }

  public updateUser(userId: string, user: User): void {}

  public removeUser(userId: string): void {
    this.usersMock = this.usersMock.filter((item: User) => item.id !== userId);
    this.users.next({
      totalCount: usersMock.length,
      items: this.paginate(this.usersMock, this.activatedRoute.snapshot.queryParams),
      pageCount: usersMock.length / 20,
    });
  }

  getUserById(userId: string): Observable<User> {
    const user: User = this.usersMock.find((user: User) => user.id === userId);
    return of(user);

    // return this.httpClient.get('data.json');
  }
}

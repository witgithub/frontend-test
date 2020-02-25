import { Injectable } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { usersMock } from './users.mock';
import { User } from '../models/user.class';
import { map, delay } from 'rxjs/operators';
import { List } from '../models/list.interface';
import { UserNS } from '../models/user.namespace';
import { paginate } from '../../shared/helpers/paginate.function';
import { SortDirections } from '../models/sort.interface';

@Injectable()
export class UsersService {
  constructor(private activatedRoute: ActivatedRoute) {}
  private delayTime: number = 200;
  private defaultPagination: { page: number; limit: number } = {
    page: 1,
    limit: 20,
  };
  private usersMock: User[] = usersMock.map(
    user =>
      new User(
        user.avatarUrl,
        user.name,
        user.company,
        user.email,
        user.phone,
        user.address,
        user.about,
        user.tags,
        user.createdAt,
        user.id,
      ),
  );

  public users$: BehaviorSubject<List<User>> = new BehaviorSubject<List<User>>({
    totalCount: usersMock.length,
    items: paginate(this.usersMock, this.defaultPagination),
    pageCount: Math.ceil(usersMock.length / this.defaultPagination.limit),
  });

  public getUsers(params: Params): Observable<List<User>> {
    let usersMirror: User[] = [...this.usersMock];
    if (params.search) {
      usersMirror = usersMirror.filter(
        (user: User) =>
          user.name.toLowerCase().includes(params.search.toLowerCase()) ||
          user.company.toLowerCase().includes(params.search.toLowerCase()),
      );
    }
    if (params.sortKey && params.direction) {
      usersMirror.sort((user: User, user2: User) => {
        return params.direction === SortDirections.ASC
          ? user[params.sortKey] > user2[params.sortKey]
            ? 1
            : -1
          : user[params.sortKey] < user2[params.sortKey]
          ? 1
          : -1;
      });
    }
    const paginatedUsers: User[] = paginate(usersMirror, params);
    return of(paginatedUsers).pipe(
      delay(this.delayTime),
      map((response: User[]) => {
        const users: User[] = response.map(
          (user: User) =>
            new User(
              user.avatarUrl,
              user.name,
              user.company,
              user.email,
              user.phone,
              user.address,
              user.about,
              user.tags,
              user.createdAt,
              user.id,
            ),
        );
        return {
          totalCount: usersMirror.length,
          items: users,
          pageCount: usersMirror.length / params.page,
        };
      }),
    );
  }

  public createUser(user: UserNS.UserFormData): void {
    this.usersMock.unshift(
      new User(
        user.avatarUrl,
        user.name,
        user.company,
        user.email,
        user.phone,
        user.address,
        user.about,
        user.tags,
      ),
    );
  }

  public updateUser(userId: string, userFormData: UserNS.UserFormData): void {
    const userIndex: number = this.usersMock.findIndex(
      (user: User) => user.id === userId,
    );
    const user: User = { ...this.usersMock[userIndex], ...userFormData };
    const updatedUser: User = new User(
      user.avatarUrl,
      user.name,
      user.company,
      user.email,
      user.phone,
      user.address,
      user.about,
      user.tags,
      user.createdAt,
      user.id,
    );
    this.usersMock[userIndex] = updatedUser;
  }

  public removeUser(userId: string): void {
    this.usersMock = this.usersMock.filter((item: User) => item.id !== userId);
    this.users$.next({
      totalCount: this.usersMock.length,
      items: paginate(this.usersMock, this.activatedRoute.snapshot.queryParams),
      pageCount: Math.ceil(
        this.usersMock.length / this.defaultPagination.limit,
      ),
    });
  }

  public getUserById(userId: string): Observable<User> {
    const user: User = this.usersMock.find((user: User) => user.id === userId);
    return of(user).pipe(delay(this.delayTime));
  }
}

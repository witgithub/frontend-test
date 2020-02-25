import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../../models/user.class';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../../models/list.interface';
import { UsersService } from '../../services/users.service';
import { Sort } from '../../models/sort.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  usersList$: Observable<List<User>>;
  queryParams: Observable<Params> = this.activatedRoute.queryParams;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.setPagination();
    this.usersList$ = merge(
      this.usersService.users$,
      this.activatedRoute.data.pipe(map(data => data.usersList)),
    );
  }

  get searchQuery() {
    return this.activatedRoute.snapshot.queryParams.search;
  }

  private setPagination(): void {
    if (!this.activatedRoute.snapshot.queryParams.page) {
      this.router.navigate(['.'], {
        queryParams: { page: 1, limit: 20 },
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute,
        preserveFragment: false
      });
    }
  }

  public searchHandler(search: { search: string }): void {
    this.router.navigate(['.'], {
      queryParams: { ...search, page: 1 },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }

  public removeUserHandler(userId: string): void {
    this.usersService.removeUser(userId);
  }
}

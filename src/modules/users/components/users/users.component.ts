import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../../models/user.class';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../../models/list.interface';
import { UsersService } from '../../services/users.service';

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
    this.initPagination();
    this.init();
    
  }

  initPagination(): void {
    this.router.navigate(['.'], {
      queryParams: { page: 1, limit: 20 },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }

  init(): void {

    this.usersList$ = this.usersService.users;
    
    // this.usersList$ = this.activatedRoute.data.pipe(
    //   map(data => data.usersList),
    // );
  }

  removeUserHandler(userId: string): void {
    this.usersService.removeUser(userId);
    // this.usersList$ = this.usersService.getUsers(this.activatedRoute.snapshot.queryParams);
  }
}

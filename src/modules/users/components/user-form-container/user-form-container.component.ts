import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.class';
import { UsersService } from '../../services/users.service';
import { UserNS } from '../../models/user.namespace';

@Component({
  selector: 'app-user-form-container',
  templateUrl: './user-form-container.component.html',
  styleUrls: ['./user-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormContainerComponent implements OnInit {
  public user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data.user;
  }

  public handleUserUpdate(userFormData: UserNS.UserFormData): void {
    if (this.user) {
      this.usersService.updateUser(this.user.id, userFormData);
      this.location.back();
    } else {
      this.usersService.createUser(userFormData);
      this.router.navigate(['/users'], { queryParams: { page: 1, limit: 20 } });
    }
  }
}

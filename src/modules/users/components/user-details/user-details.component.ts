import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent implements OnInit {
  public user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit() {
    this.user = this.activatedRoute.snapshot.data.details;
  }

  public backToList(): void {
    this.location.back();
  }
}

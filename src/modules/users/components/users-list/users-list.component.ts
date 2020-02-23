import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  @Input() usersList: User[];
  @Output() removeUser: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
    console.log(this.usersList, 'list')
  }

  removeUserHandler(userId: string): void {
    this.removeUser.emit(userId);
  }

}

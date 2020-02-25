import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() usersList: User[];
  @Output() removeUser: EventEmitter<string> = new EventEmitter<string>();

  public removeUserHandler(userId: string): void {
    this.removeUser.emit(userId);
  }
}

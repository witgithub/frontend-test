import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null;
  @Output() userData: EventEmitter<User> = new EventEmitter<User>();
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm(this.user);
  }
  private initForm(user: User): void {
    this.form = this.fb.group({
      name: [],
      company: [],
      address: [],
      about: [],
      tags: [],
      email: [],
    });
  }

  addUser(form: FormGroup): void {
    console.log(form, 'formGroup')
  }
}

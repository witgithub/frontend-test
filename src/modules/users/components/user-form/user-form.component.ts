import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { User } from '../../models/user.class';
import { UserNS } from '../../models/user.namespace';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  @Input() public readonly user: User;
  @Output() public readonly formSubmited: EventEmitter<
    UserNS.UserFormData
  > = new EventEmitter<UserNS.UserFormData>();
  public form: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit() {
    this.initForm(this.user);
  }
  private initForm(user: User): void {
    this.form = this.fb.group({
      avatarUrl: [(user && user.avatarUrl) || 'http://placehold.it/32x32'],
      name: [
        (user && user.name) || null,
        [Validators.required],
      ],
      company: [(user && user.company) || null, [Validators.required]],
      address: [(user && user.address) || null],
      about: [(user && user.about) || null],
      tags: this.createTags(user),
      email: [(user && user.email) || null],
      phone: [(user && user.phone) || null],
    });
  }

  private createTags(user: User): FormArray {
    const tagsControls: FormArray = this.fb.array([]);
    if (user && user.tags) {
      user.tags.forEach((tag: string) => {
        tagsControls.push(new FormControl(tag));
      });
    }
    return tagsControls;
  }

  get tagsControls(): AbstractControl[] {
    return (this.form.get('tags') as FormArray).controls;
  }

  public isRequired(controlName: string) {
    return (
      this.form.get(controlName).hasError('required') &&
      this.form.get(controlName).touched
    );
  }

  get avatarUrl(): string {
    return this.form.get('avatarUrl').value;
  }

  public removeTag(index: number): void {
    (this.form.get('tags') as FormArray).removeAt(index);
  }

  public addNewTag(): void {
    (this.form.get('tags') as FormArray).push(new FormControl(null));
  }

  public emitUserData(form: FormGroup): void {
    this.form.markAllAsTouched();
    if (form.valid) {
      this.formSubmited.emit(form.value);
    }
  }
  public goBack(): void {
    this.location.back();
  }
}

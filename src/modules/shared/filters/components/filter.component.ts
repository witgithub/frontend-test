import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() query: string;
  @Output() search: EventEmitter<{ search: string }> = new EventEmitter<{
    search: string;
  }>();

  public filters: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.setListener();
  }

  private createForm(): void {
    this.filters = this.fb.group({
      search: [this.query || null],
    });
  }
  private setListener(): void {
    this.subscription.add(
      this.filters.valueChanges
        .pipe(debounceTime(500))
        .subscribe((formValue: { search: string }) => {
          this.search.emit(formValue);
        }),
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

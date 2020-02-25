import { Directive, HostListener, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, SortDirections } from '../../users/models/sort.interface';

@Directive({
  selector: '[appSort]',
})
export class SortDirective {
  @Input() sortField: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  @HostListener('click', ['$event']) changeSort(): void {
    const currentOrder: string = this.activatedRoute.snapshot.queryParams
      .direction;
    const sort: Sort = {
      sortKey: this.sortField,
      direction:
        currentOrder === SortDirections.ASC
          ? SortDirections.DESC
          : SortDirections.ASC,
    };

    this.router.navigate(['.'], {
      queryParams: sort,
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}

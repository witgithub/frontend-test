import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pagination } from '../models/pagination.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {
  @Input() pagination: Params;
  @Input() totalCount: number;
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  public pager: Pagination;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pagination && changes.pagination.firstChange) {
      this.pagination = {
        page: this.activatedRoute.snapshot.queryParams.page
          ? this.activatedRoute.snapshot.queryParams.page
          : 1,
        limit: 20,
      };
    }
    if (changes.pagination || changes.totalCount) {
      this.pager = this.getPager(
        this.totalCount,
        +this.pagination.page,
        +this.pagination.limit,
      );
    }
  }

  setPage(page: number): void {
    this.pager = this.getPager(this.totalCount, page, this.pagination.limit);
    if (this.validPageExists(page)) {
      this.router.navigate(['.'], {
        queryParams: { page, limit: 20 },
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute,
      });
    }
  }

  validPageExists(page: number): boolean {
    return page <= this.pager.totalPages && page >= 1;
  }

  showNextButton(): boolean {
    return +this.pager.currentPage !== this.pager.totalPages;
  }

  showPrevButton(): boolean {
    return this.pager.currentPage > 1;
  }

  private getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 20,
  ): Pagination {
    const totalPages: number = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }
    const pages: number[] = Array.from(
      Array(totalPages),
      (omit, index) => index + 1,
    );
    return {
      currentPage,
      totalPages,
      pages,
    };
  }
}

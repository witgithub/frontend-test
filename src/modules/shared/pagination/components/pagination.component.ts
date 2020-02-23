import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-paginator',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges, OnInit {
  @Input() pagination;
  @Input() totalCount: number;
  @Output() changePage: EventEmitter<any> = new EventEmitter();
  public pager;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pagination && !changes.pagination.firstChange) {
      if (this.pagination) {
        console.log(this.pagination, 'test')
        this.pager = this.getPager(
        this.totalCount,
          this.pagination.page,
          this.pagination.limit
        );
        console.log(this.pager, 'pager')
      }
    }
  }

  setPage(page: number): void {
      console.log(page, 'page')
    this.pager = this.getPager(this.totalCount, page, this.pagination.limit);
    // console.log(this.pager, 'pager')
    // if (this.validPageExists(page)) {
      this.router.navigate(['.'], {
        queryParams: { page, limit: 20 },
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute,
      });
    // }
  }

  validPageExists(page: number): boolean {
    return page <= this.pager.totalPages && page >= 1;
  }

  showNextButton(): boolean {
    return this.pager.currentPage !== this.pager.totalPages;
  }

  showPrevButton(): boolean {
    //   console.log(this.pager, 'pager')
    return this.pager.currentPage > 1;
  }

  private getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 20,
  ) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number;
    let endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 3 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      i => startPage + i,
    );

    return ({
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      pages,
    });
  }
}

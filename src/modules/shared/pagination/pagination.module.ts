import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/pagination.component';

@NgModule({
  imports: [CommonModule],
  exports: [PaginatorComponent],
  declarations: [PaginatorComponent],
  providers: [],
})
export class PaginationModule {}

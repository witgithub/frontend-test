import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortDirective } from './sort.directive';

@NgModule({
  imports: [CommonModule],
  exports: [SortDirective],
  declarations: [SortDirective],
  providers: [],
})
export class DirectivesModule {}

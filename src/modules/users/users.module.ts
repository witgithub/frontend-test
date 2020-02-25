import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from './services/users.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersListResolver } from './services/users-list.resolver';
import { UserResolver } from './services/user.resolver';
import { PaginationModule } from '../shared/pagination/pagination.module';
import { UserFormContainerComponent } from './components/user-form-container/user-form-container.component';
import { FilterModule } from '../shared/filters/filters.module';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    PaginationModule,
    FilterModule,
    DirectivesModule
  ],
  exports: [],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserFormComponent,
    UserDetailsComponent,
    UserFormContainerComponent,
  ],
  providers: [UsersService, UsersListResolver, UserResolver, DatePipe],
})
export class UsersModule {}

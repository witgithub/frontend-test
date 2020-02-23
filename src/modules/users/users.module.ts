import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersService } from './services/users.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersListResolver } from './services/users-list.resolver';
import { UserDetailsResolver } from './services/user-edit.resolver';
import { PaginationModule } from '../shared/pagination/pagination.module';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, PaginationModule],
  exports: [],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserFormComponent,
    UserDetailsComponent,
  ],
  providers: [UsersService, UsersListResolver, UserDetailsResolver],
})
export class UsersModule {}

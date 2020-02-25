import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersListResolver } from './services/users-list.resolver';
import { UserResolver } from './services/user.resolver';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFormContainerComponent } from './components/user-form-container/user-form-container.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      usersList: UsersListResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'edit/:id',
    component: UserFormContainerComponent,
    resolve: { user: UserResolver },
    canActivate: [],
  },
  {
    path: 'add-user',
    component: UserFormContainerComponent,
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
    resolve: {
      details: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersListResolver } from './services/users-list.resolver';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsResolver } from './services/user-edit.resolver';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      usersList: UsersListResolver
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
    resolve: { userDetails: UserDetailsResolver },
    canActivate: [],
  },
  {
    path: 'add-user',
    component: UserFormComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}

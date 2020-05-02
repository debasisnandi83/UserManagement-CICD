import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from '../../shared/layout/main-layout/main-layout.component';
import { ManageUserComponent } from './manageuser.component';
import { AddUserComponent } from './add-user.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ManageUserComponent }
    ]
  },
  {
    path: 'add-user',
    component: MainLayoutComponent,
    children: [
      { path: '', component: AddUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AccountComponent } from './account/account.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'account', component: AccountComponent, },
      { path: 'edit-details', component: EditDetailsComponent, },
      { path: 'change-password', component: ChangePasswordComponent, },
      { path: '**', redirectTo: 'account', },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }

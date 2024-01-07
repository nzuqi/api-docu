import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';



@NgModule({
  declarations: [
    ProfileComponent,
    AccountComponent,
    ChangePasswordComponent,
    EditDetailsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }

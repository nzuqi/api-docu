import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AccountComponent } from './account/account.component';
import { ApiKeysComponent } from './api-keys/api-keys.component';
import { ApiUsageComponent } from './api-usage/api-usage.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';



@NgModule({
  declarations: [
    ProfileComponent,
    AccountComponent,
    ApiKeysComponent,
    ApiUsageComponent,
    ChangePasswordComponent,
    EditDetailsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }

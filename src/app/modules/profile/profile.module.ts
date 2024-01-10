import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';



@NgModule({
  declarations: [
    ProfileComponent,
    AccountComponent,
    ChangePasswordComponent,
    EditDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    BreadcrumbsComponent,
    SidenavComponent,
    ToolbarComponent,
  ]
})
export class ProfileModule { }

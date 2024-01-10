import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiManagementComponent } from './api-management.component';
import { KeysComponent } from './keys/keys.component';
import { UsageComponent } from './usage/usage.component';
import { BreadcrumbsComponent } from 'src/app/components/breadcrumbs/breadcrumbs.component';
import { SidenavComponent } from 'src/app/components/sidenav/sidenav.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { ApiManagementRoutingModule } from './api-management.routing.module';



@NgModule({
  declarations: [
    ApiManagementComponent,
    KeysComponent,
    UsageComponent
  ],
  imports: [
    CommonModule,
    SidenavComponent,
    ToolbarComponent,
    BreadcrumbsComponent,
    ApiManagementRoutingModule
  ]
})
export class ApiManagementModule { }

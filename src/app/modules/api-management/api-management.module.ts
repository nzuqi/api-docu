import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiManagementComponent } from './api-management.component';
import { KeysComponent } from './keys/keys.component';
import { UsageComponent } from './usage/usage.component';



@NgModule({
  declarations: [
    ApiManagementComponent,
    KeysComponent,
    UsageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApiManagementModule { }

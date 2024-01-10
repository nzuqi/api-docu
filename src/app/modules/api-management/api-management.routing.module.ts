import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiManagementComponent } from './api-management.component';
import { KeysComponent } from './keys/keys.component';
import { UsageComponent } from './usage/usage.component';

const routes: Routes = [
  {
    path: '',
    component: ApiManagementComponent,
    children: [
      { path: 'keys', component: KeysComponent, },
      { path: 'usage', component: UsageComponent, },
      { path: '**', redirectTo: 'keys', },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [],
  },
  {
    path: 'documentation',
    loadChildren: () => import('./modules/api-documentation/api-documentation.module').then((m) => m.ApiDocumentationModule),
    canActivate: [authGuard],
  },
  {
    path: 'api',
    loadChildren: () => import('./modules/api-management/api-management.module').then((m) => m.ApiManagementModule),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

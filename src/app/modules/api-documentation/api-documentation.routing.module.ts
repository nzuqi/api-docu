import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationComponent } from './documentation/documentation.component';
import { ApiDocumentationComponent } from './api-documentation.component';

const routes: Routes = [
  {
    path: '',
    component: ApiDocumentationComponent,
    children: [
      { path: '', component: DocumentationComponent, },
      { path: ':section/:slug', component: DocumentationComponent, },
      { path: '**', redirectTo: '', },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiDocumentationRoutingModule { }

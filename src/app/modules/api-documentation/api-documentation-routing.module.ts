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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApiDocumentationRoutingModule { }

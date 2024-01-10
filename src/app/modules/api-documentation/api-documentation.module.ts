import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDocumentationComponent } from './api-documentation.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ApiDocumentationRoutingModule } from './api-documentation.routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ApiDocumentationComponent,
    DocumentationComponent,
  ],
  imports: [
    CommonModule,
    ApiDocumentationRoutingModule,
    HttpClientModule,
    BreadcrumbsComponent,
    ToolbarComponent,
    SidenavComponent,
  ]
})
export class ApiDocumentationModule { }

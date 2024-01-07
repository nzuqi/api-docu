import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDocumentationComponent } from './api-documentation.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DocumentationComponent } from './documentation/documentation.component';
import { ApiDocumentationRoutingModule } from './api-documentation-routing.module';



@NgModule({
  declarations: [
    ApiDocumentationComponent,
    SidenavComponent,
    ToolbarComponent,
    BreadcrumbsComponent,
    DocumentationComponent,
  ],
  imports: [
    CommonModule,
    ApiDocumentationRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ]
})
export class ApiDocumentationModule { }

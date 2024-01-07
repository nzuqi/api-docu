import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  crumbs: any[] = [
    { title: 'Home', path: '/' },
    { title: 'API Documentation', path: '/documentation' },
    { title: 'Authentication', path: '/documentation/authentication' },
  ];
}

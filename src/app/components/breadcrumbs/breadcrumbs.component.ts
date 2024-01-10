import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class BreadcrumbsComponent {
  @Input() crumbs: any[] = [];

  constructor(private router: Router) { }

  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }
}

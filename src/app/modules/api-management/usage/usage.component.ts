import { Component } from '@angular/core';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss']
})
export class UsageComponent {
  crumbs: any[] = [];

  constructor() {
    this.crumbs = [
      { title: 'Home', path: '/' },
      { title: 'API Management', path: '/api' },
      { title: 'Usage & Stats', path: '/api/usage' },
    ];
  }
}

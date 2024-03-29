import { Component } from '@angular/core';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent {
  crumbs: any[] = [];

  constructor() {
    this.crumbs = [
      { title: 'Home', path: '/' },
      { title: 'API Management', path: '/api' },
      { title: 'Manage API Keys', path: '/api/keys' },
    ];
  }
}

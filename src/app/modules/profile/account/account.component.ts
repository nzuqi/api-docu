import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  crumbs: any[] = [];

  constructor() {
    this.crumbs = [
      { title: 'Home', path: '/' },
      { title: 'Profile', path: '/profile' },
      { title: 'Account', path: '/profile/account' },
    ];
  }
}

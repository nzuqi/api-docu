import { Component } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  crumbs: any[] = [];

  constructor() {
    this.crumbs = [
      { title: 'Home', path: '/' },
      { title: 'Profile', path: '/profile' },
      { title: 'Account', path: '/profile/account' },
      { title: 'Change Password', path: '/profile/account/change-password' },
    ];
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent {
  crumbs: any[] = [];

  constructor() {
    this.crumbs = [
      { title: 'Home', path: '/' },
      { title: 'Profile', path: '/profile' },
      { title: 'Account', path: '/profile/account' },
      { title: 'Edit Details', path: '/profile/account/edit-details' },
    ];
  }
}

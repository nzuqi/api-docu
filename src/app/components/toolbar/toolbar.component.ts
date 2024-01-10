import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
})
export class ToolbarComponent {
  showMenu: boolean = false;

  constructor(public sidenavService: SidenavService, private authService: AuthService, private router: Router, private alertService: AlertService) { }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    const sidenav = document.querySelector('app-sidenav');
    this.showMenu ? sidenav?.classList.add('show-nav-small-device') : sidenav?.classList.remove('show-nav-small-device');
  }

  signout(): void {
    this.authService.signout();
    this.router.navigateByUrl('/auth');
    this.alertService.openSnackBar("You've signed out successfully.");
  }
}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  showMenu: boolean = false;

  constructor(public sidenavService: SidenavService, private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    const sidenav = document.querySelector('app-sidenav');
    this.showMenu ? sidenav?.classList.add('show-nav-small-device') : sidenav?.classList.remove('show-nav-small-device');
  }

  signout(): void {
    this.authService.signout();
    this.router.navigateByUrl('/auth');
    this.openSnackBar("You've signed out successfully.");
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', { duration: 10000, verticalPosition: 'top' });
  }
}

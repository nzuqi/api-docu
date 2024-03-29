import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }

  canActivate(): boolean {
    const usr = this.storageService.getData('api-docu-user');
    if (!usr) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    const user = JSON.parse(usr);
    if (!user?.token) return false;
    return true;
  }

  signup(user: any): Observable<boolean> {
    user.password = btoa(user.password);
    this.storageService.saveData('api-docu-user', JSON.stringify(user));
    return of(true);
  }

  signin(email: string, password: string): Observable<boolean> {
    let response = false;
    const usr = this.storageService.getData('api-docu-user');
    if (usr) {
      const user = JSON.parse(usr);
      if (user?.email == email && atob(user?.password || '') == password) {
        user.token = 'JhfDZsw2wE0IUu4WdHONLiF2HU96bWdq'; // Some random string
        this.storageService.saveData('api-docu-user', JSON.stringify(user));
        response = true;
      } else response = false;
    }
    return of(response);
  }

  signout(): boolean {
    const usr = this.storageService.getData('api-docu-user');
    if (usr) {
      const user = JSON.parse(usr);
      user.token = undefined;
      this.storageService.saveData('api-docu-user', JSON.stringify(user));
    }
    return true;
  }
}

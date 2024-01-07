import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private storageService: StorageService,) { }

  canActivate(): boolean {
    const usr = this.storageService.getData('auth');
    if (!usr) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    // const user = JSON.parse(usr);
    // if (!user?.token) return false;
    // return true;
    return true;
  }
}

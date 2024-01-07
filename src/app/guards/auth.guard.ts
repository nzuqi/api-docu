import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const usr = localStorage.getItem('auth');
  if (!usr) return false;
  // const user = JSON.parse(usr);
  // if (!user?.token) return false;
  // return true;
  return true;
};

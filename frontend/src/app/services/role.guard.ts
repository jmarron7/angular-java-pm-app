import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard  {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    const user = localStorage.getItem('user');
    if (user != null) {
      if (JSON.parse(user).admin) {
        return true;
      } else {
        this.router.navigate(['/login'])
        return false;
      } 
    }
    this.router.navigate(['/login'])
    return false;
  }
}
  
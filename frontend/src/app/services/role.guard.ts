import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      console.log('CanActivate called');
    let user = localStorage.getItem('user');
    if (user != null) {
      if (JSON.parse(user).isAdmin) {
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
  
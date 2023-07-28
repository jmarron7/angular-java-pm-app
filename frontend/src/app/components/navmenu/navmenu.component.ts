import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
})
export class NavmenuComponent {
  isAdmin = false;
  toggleMenu = false;
  profile: any;
  companyName: any;
  scrolled = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('user') as string).admin;
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) this.profile = user.profile;
    const companyName = String(localStorage.getItem('companyName')!);
    if (companyName) this.companyName = companyName;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }

  logout() {
    if (this.authService.isLoggedIn()) this.authService.logout();
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}

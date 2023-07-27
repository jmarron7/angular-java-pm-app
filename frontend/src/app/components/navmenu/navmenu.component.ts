import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
})
export class NavmenuComponent {
  isAdmin: boolean = false;
  toggleMenu: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('user') as string).admin;
  }

  logout() {
    if (this.authService.isLoggedIn()) this.authService.logout();
  }
}

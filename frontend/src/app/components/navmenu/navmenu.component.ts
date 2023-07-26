import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css'],
})
export class NavmenuComponent {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('user') as string).admin
  }
  // createUser() {
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   if (user) this.user = user;
  //   else console.error('User not found in local storage.');
  // }

  navLogout() {
    this.authService.logout();
  }

  // test() {
  //   console.log(this.user);
  // }
}

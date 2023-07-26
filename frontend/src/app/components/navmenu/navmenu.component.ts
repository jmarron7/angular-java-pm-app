import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

 user: any;

  

  constructor( private authService: AuthService) {}

  createUser() {
   
    const navUser= localStorage.getItem('user');

   
    if (navUser) {
      this.user = JSON.parse(navUser);
    } else {
 
      console.error('User not found in local storage.');
    }
  }

  

  navLogout() {this.authService.logout()}



}

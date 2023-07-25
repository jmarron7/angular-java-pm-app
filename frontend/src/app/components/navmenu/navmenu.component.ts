import { Component } from '@angular/core';
import { FullUserDto, GeneralService } from '../../services/general.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

  user: FullUserDto = new FullUserDto();
  

  constructor(private generalService: GeneralService, private authService: AuthService) {}

  // createUser() {
   

   
  //   this.generalService.getFullUserDto().subscribe(

  //     (response) => {
        
  //       console.log('User created successfully!', response);
  //     },
  //     (error) => {
       
  //       console.error('Error creating user:', error);
  //     }
  //   );

  // }

  navLogout() {this.authService.logout()}



}

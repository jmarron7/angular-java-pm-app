import { Component } from '@angular/core';
import { FullUserDto, GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent {

  user: FullUserDto = new FullUserDto();

  constructor(private generalService: GeneralService) {}

  createUser() {
   
    this.user.profile = `${this.user.firstname} ${this.user.lastname}`;
    

   
    this.generalService.getFullUserDto(this.user).subscribe(
      (response) => {
        
        console.log('User created successfully!', response);
      },
      (error) => {
       
        console.error('Error creating user:', error);
      }
    );
  }

}

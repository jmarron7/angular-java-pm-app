import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
      
  constructor(private authService: AuthService) {}
  
  invalid: boolean = false;

  login(form: any) {
    console.log(form);
    this.authService.login(form.username, form.password); 
    this.invalid = true;
  }

}


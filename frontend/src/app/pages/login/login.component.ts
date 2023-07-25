import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
      
  constructor(private authService: AuthService, private router: Router) {}
  
  invalid: boolean = false;

  login(form: any) {
    this.authService.login(form.username, form.password).subscribe({
      next: data => {
        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error: error => {
        console.error(error);
        this.invalid = true;
      }
    })
  }

}


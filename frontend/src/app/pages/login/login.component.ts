import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRequestDto } from '../../services/general.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isInvalid = false;
  isPending = false;
  userId = 0;
  user: UserRequestDto = {
    credentials: {
      username: '',
      password: '',
    },
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    admin: false,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  login(form: any) {
    this.authService.login(form.username, form.password).subscribe({
      next: (data) => {
        const userData = JSON.parse(JSON.stringify(data));
        this.userId = userData.id;
        this.user.profile = userData.profile;
        this.user.credentials = {
          username: form.username,
          password: form.password,
        };
        this.user.admin = userData.admin;
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData);
        if (userData.status === 'PENDING') this.isPending = true;
        else {
          if (userData.admin) {
            this.router.navigate(['/select-company']);
          } else {
            localStorage.setItem('companyId', userData.companies[0].id);
            this.router.navigate(['/']);
          }
        }
      },
      error: (e) => {
        console.error(e);
        this.isInvalid = true;
      },
    });
  }

  updatePassword(form: any) {
    const url = 'http://localhost:8080/users/' + this.userId;
    this.user.credentials.password = form.password;
    this.http.put<any>(url, this.user).subscribe({
      next: () => {
        if (this.user.admin) this.router.navigate(['/select-company']);
        else this.router.navigate(['/']);
      },
      error: (e) => {
        console.error(e);
        this.isInvalid = true;
      },
    });
  }
}

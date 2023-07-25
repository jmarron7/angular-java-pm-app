import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GeneralService, UserRequestDto } from '../../services/general.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private generalService: GeneralService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  isInvalid: boolean = false;
  isPending: boolean = true;
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

  login(form: any) {
    this.authService.login(form.username, form.password).subscribe({
      next: (data) => {
        console.log(data);

        let userData = JSON.parse(JSON.stringify(data));
        this.userId = userData.id;
        this.user.profile = userData.profile;
        this.user.credentials = {
          username: form.username,
          password: form.password,
        };
        this.user.admin = userData.admin;

        localStorage.setItem('user', userData);
        localStorage.setItem('companyId', userData.companyId);
        if (userData.status === "PENDING") {
          this.isPending = true;
        }
        else {
          if (userData.admin) {
            this.router.navigate(['/select-company'])
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (error) => {
        console.error(error);
        this.isInvalid = true;
      },
    });
  }

  updatePassword(form: any) {
    let url = 'users/' + this.userId;
    this.user.credentials.password = form.password;

    this.http.put<any>(url, this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
        this.isInvalid = true;
      },
    });
  }
}

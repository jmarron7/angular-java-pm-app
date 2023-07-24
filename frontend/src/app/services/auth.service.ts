import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post<any>('http://localhost:8080/users/login', { username: username, password: password }).subscribe({
      next: data => {
        console.log(data);
        let user = {
          username: username,
          password: password
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/announcements']);
      },
      error: error => {
        console.error(error);
      }
    })

  }

  logout(): void {
    localStorage.removeItem("user");
  }

  isLoggedIn(): boolean {
    return true;
    // return localStorage.getItem("user") != null;
  }
}



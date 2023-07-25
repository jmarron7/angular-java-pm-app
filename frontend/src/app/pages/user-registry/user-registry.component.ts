import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
export class UserRegistryComponent {
  users: any;

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    let url = 'http://localhost:8080/company/' + localStorage.getItem('companyId') +  '/users';
    this.http.get<any>(url).subscribe({
        next: data => {
            this.users = data;
        },
        error: error => {
            console.error(error);
          }
      })
  }
}

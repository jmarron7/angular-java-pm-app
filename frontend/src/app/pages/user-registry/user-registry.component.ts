import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
export class UserRegistryComponent {
  users: any;
  showUserOverlay: boolean = false;
  showAdminOverlay: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/users';
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (e) => console.error(e),
    });
  }

  toggleAdminOverlay() {
    this.showAdminOverlay = !this.showAdminOverlay;
  }

  toggleUserOverlay() {
    this.showUserOverlay = !this.showUserOverlay;
  }
}

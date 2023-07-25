import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
<<<<<<< HEAD
export class UserRegistryComponent {

  users: any[] = [1,2,3,4];

  constructor(private http: HttpClient, private router: Router) { 
  }

  ngOnInit() {
    let url = 'company/' + localStorage.getItem('companyId') +  '/users';
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
=======
export class UserRegistryComponent {}
>>>>>>> c39503da1610d3cf97b5ba94aee277e6e8eaabdb

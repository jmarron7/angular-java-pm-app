import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: any[] = [1,2,3];

  constructor(private http: HttpClient, private router: Router) { 
  }

  ngOnInit() {
    let url = 'company/' + localStorage.getItem('companyId') +  '/teams';
    this.http.get<any>(url).subscribe({
        next: data => {
            this.teams = data;
        },
        error: error => {
            console.error(error);
          }
      })
  }
}

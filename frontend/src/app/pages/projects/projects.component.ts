import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
 
  projects: any[] = [1,2,3,4];
  teamId = '';

  constructor(private http: HttpClient, private router: Router) { 
    let input = this.router.getCurrentNavigation();
    this.teamId = input?.extras?.state?.['teamId'];
  }

  ngOnInit() {
    let url = 'company/' + localStorage.getItem('companyId') +  '/teams' + this.teamId + '/projects';
    this.http.get<any>(url).subscribe({
        next: data => {
            this.projects = data;
        },
        error: error => {
            console.error(error);
          }
      })
  }
}


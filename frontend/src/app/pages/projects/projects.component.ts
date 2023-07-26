import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
 
  projects: ProjectDto[] = [];

  constructor(private http: HttpClient, private router: Router) { 
    let input = this.router.getCurrentNavigation();
    this.projects = input?.extras?.state?.['projects'];
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user') as string);
    if (this.projects.length === 0 && user.admin) {
    let url = 'company/' + localStorage.getItem('companyId') +  '/teams' + user.teams[0] + '/projects';
    this.http.get<any>(url).subscribe({
        next: data => {
            this.projects = data as ProjectDto[];
        },
        error: error => {
            console.error(error);
          }
      })
    }
  }
}


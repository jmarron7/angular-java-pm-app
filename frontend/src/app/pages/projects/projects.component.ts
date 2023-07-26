import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  showOverlay: boolean = false;
  projects: ProjectDto[] = [];
  teamName: string = '';
  teamId: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    let input = this.router.getCurrentNavigation();

    let receivedProjects = input?.extras?.state?.['projects'];
    if (receivedProjects != null) {
      this.projects = receivedProjects;
    }
    let receivedTeamName = input?.extras?.state?.['teamName'];
    if (receivedTeamName != null) {
      this.teamName = receivedTeamName;
    }
    let receivedTeamId = input?.extras?.state?.['teamId'];
    if (receivedTeamId != null) {
      this.teamId = receivedTeamId;
    }
    console.log('Team Name from Projects: ' + this.teamName);
  }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user') as string);
    if (this.projects.length === 0 && !user.admin) {
      console.log('we are in the if!');
      this.teamName = JSON.parse(
        localStorage.getItem('user') as string
      ).teams[0].name;
      this.teamId = JSON.parse(
        localStorage.getItem('user') as string
      ).teams[0].id;
      let url =
        'http://localhost:8080/company/' +
        localStorage.getItem('companyId') +
        '/teams/' +
        user.teams[0].id +
        '/projects';
      this.http.get<any>(url).subscribe({
        next: (data) => {
          this.projects = data as ProjectDto[];
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

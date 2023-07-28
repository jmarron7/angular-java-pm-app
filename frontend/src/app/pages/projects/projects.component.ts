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
  showOverlay = false;
  projects: ProjectDto[] = [];
  teamName = '';
  teamId = 0;
  team: any = undefined;
  isAdmin = false;

  constructor(private http: HttpClient, private router: Router) {
    const input = this.router.getCurrentNavigation();
    const receivedTeamId = input?.extras?.state?.['teamId'];
    if (receivedTeamId) this.teamId = receivedTeamId;
    const receivedTeamName = input?.extras?.state?.['teamName'];
    if (receivedTeamName) this.teamName = receivedTeamName;
    const receivedTeam = input?.extras?.state?.['team'];
    if (receivedTeam) this.team = receivedTeam;
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (this.teamId === 0) this.teamId = user.teams[0].id;
    if (this.teamName === '') this.teamName = user.teams[0].name;
    if (!this.team) this.team = user.teams[0];
    this.isAdmin = user.admin;

    const url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/teams/' +
      this.teamId +
      '/projects';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.projects = (data as ProjectDto[]).sort((a: ProjectDto, b: ProjectDto) => a.date < b.date ? 1 : -1);
      },
      error: (e) => console.error(e),
    });
  }

  updateProjectList() {
    const url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/teams/' +
      this.teamId +
      '/projects';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.projects = data as ProjectDto[];
      },
      error: (e) => console.error(e),
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

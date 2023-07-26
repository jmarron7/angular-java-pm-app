import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  TeamDto,
  ProjectDto,
  GeneralService,
} from '../../services/general.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: any[] = [];
  creatingTeam: boolean = false;

  constructor(
    private generalService: GeneralService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    let url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/teams';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((team: TeamDto) => {
          let url =
            'http://localhost:8080/company/' +
            localStorage.getItem('companyId') +
            '/teams/' +
            team.id +
            '/projects';
          this.http.get<any>(url).subscribe({
            next: (data) => {
              this.teams.push({
                id: team.id,
                name: team.name,
                members: team.teammates,
                projects: JSON.parse(JSON.stringify(data)),
              });
            },
            error: (error) => {
              console.error(error);
            },
          });
        });
        console.log(this.teams);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

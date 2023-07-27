import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectDto, TeamDto } from '../../services/general.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: any[] = [];
  showOverlay: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/teams';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        let index = 0;
        data.forEach((team: any) => {
          
          this.teams.push({
            id: team.id,
            name: team.name,
            members: team.teammates,
            projects: [],
          });

          let url =
            'http://localhost:8080/company/' + localStorage.getItem('companyId') + '/teams/' + team.id + '/projects';
          
            this.http.get<any>(url).subscribe({
              next: (data) => {
                this.teams[index].projects = data;
              },
              error: (error) => {
                console.error(error);
              },
              complete: () => {
                console.log(this.teams[index].projects)
                index++;
              }
            });
        });
        this.teams.sort((a: any, b: any) => 
          a.name > b.name ? 1 : -1
        );
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

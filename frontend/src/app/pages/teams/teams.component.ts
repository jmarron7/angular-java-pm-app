import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent {
  teams: any[] = [];
  showOverlay = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.teams.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
    const url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/teams';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        data.forEach((team: any) => {
          this.teams.push({
            id: team.id,
            name: team.name,
            members: team.teammates,
            projects: [],
          });
          let index = -1;
          const url =
            'http://localhost:8080/company/' +
            localStorage.getItem('companyId') +
            '/teams/' +
            team.id +
            '/projects';
          this.http.get<any>(url).subscribe({
            next: (data) => {
              for (let i = 0; i < this.teams.length; i++) {
                if (this.teams[i].id === team.id) {
                  index = i;
                  break;
                }
              }
              if (index != -1)
                this.teams[index].projects = JSON.parse(JSON.stringify(data));
            },
            error: (e) => console.error(e),
          });
        });
        this.teams.sort((a: any, b: any) => (a.id < b.id ? 1 : -1));
      },
      error: (e) => console.error(e),
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

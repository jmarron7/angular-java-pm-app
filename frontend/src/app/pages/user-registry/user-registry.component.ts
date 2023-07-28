import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FullUserDto, TeamDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css'],
})
export class UserRegistryComponent {
  users: FullUserDto[] = [];
  showUserOverlay = false;
  showAdminOverlay = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/users';
    this.http.get<any>(url).subscribe({
      next: (res) => {        
        const companyTeamIds = JSON.parse(localStorage.getItem('companyTeamIds') as string);
        this.users = (res as FullUserDto[]).sort((a: FullUserDto, b: FullUserDto) => {
          if (a.admin && !b.admin) 
            return -1;
          if (b.admin && !a.admin)
            return 1;
          return a.profile.firstName > b.profile.firstName ? 1 : -1;
        });

        for (let i = 0; i < this.users.length; i++) {
          this.users[i].teams = this.users[i].teams.filter((team: any) => companyTeamIds.includes(team.id))
        }
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

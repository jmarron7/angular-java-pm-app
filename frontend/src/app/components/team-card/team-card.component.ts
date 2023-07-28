import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
})
export class TeamCardComponent {
  @Input() team: any = {
    id: 0,
    name: '',
    members: [],
    projects: [],
  };
  teamId = 0;
  projectCount = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.teamId = this.team.id;
      this.projectCount = this.team.projects.length;
    }, 500);
  }

  goToProjects() {
    const navigationExtras: NavigationExtras = {
      state: {
        projects: this.team.projects,
        teamName: this.team.name,
        teamId: this.teamId,
        team: this.team,
      },
    };
    this.router.navigate(['/projects'], navigationExtras);
  }
}

import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProjectDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {

  @Input() team: any = {
    id: 0,
    name: '',
    members: [],
    projects: []
  }

  constructor(private router: Router) {}

  goToProjects() {
    let navigationExtras: NavigationExtras = {
      state: {
        projects: this.team.projects
      }
    };
    this.router.navigate(['/projects'], navigationExtras);
  }
}

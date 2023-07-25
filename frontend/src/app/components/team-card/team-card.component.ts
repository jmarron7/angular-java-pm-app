import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {

  @Input() teamId = '';

  constructor(private router: Router) {}

  goToProjects() {
    let navigationExtras: NavigationExtras = {
      state: {
        teamId: this.teamId
      }
    };
    this.router.navigate(['/projects'], navigationExtras);
  }
}

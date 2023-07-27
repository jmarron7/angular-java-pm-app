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

  projectCount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.projectCount = this.team.projects.length
    }, 100)
    console.log(this.team as any)
  }
  
  goToProjects() {
    let navigationExtras: NavigationExtras = {
      state: {
        projects: this.team.projects,
        teamName: this.team.name,
        teamId: this.team.id
      }
    };
    this.router.navigate(['/projects'], navigationExtras);
  }
}

import { Component, Input } from '@angular/core';
import { ProjectDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {

  @Input() project: ProjectDto = new ProjectDto();
  
}

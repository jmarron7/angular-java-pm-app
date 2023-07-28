import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  showOverlay = false;
  daysAgo = 0;
  hoursAgo = 0;
  minutesAgo = 0;
  @Input() project: ProjectDto = new ProjectDto();
  @Output() toggleModal = new EventEmitter<any>();

  ngOnInit() {
    const date1 = new Date(this.project.date);
    const date2 = new Date();
    const millDifference = date2.getTime() - date1.getTime();
    this.daysAgo = Math.floor(millDifference / (1000 * 3600 * 24));
    this.hoursAgo = Math.floor(millDifference / (1000 * 3600));
    this.minutesAgo = Math.floor(millDifference / (1000 * 60));
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrls: ['./create-project-overlay.component.css'],
})
export class CreateProjectOverlayComponent implements OnInit {
  // just for testing
  admin = true;
  //
  modalVisible = true;
  projectName = '';
  description = '';
  result = '';
  companyId = 0;
  active = true;
  @Input() teamId = 0;
  @Input() project: any;
  @Input() team: any;
  @Output() updateOverlay = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('companyId')!);
    if (companyId) this.companyId = companyId;
    if (this.project) {
      this.projectName = this.project.name;
      this.description = this.project.description;
    }
  }

  postOrPut() {
    if (this.project) this.updateProject();
    else this.createProject();
  }

  updateProject() {
    this.http
      .put(
        `http://localhost:8080/company/${this.companyId}/teams/${this.project.team.id}/project/${this.project.id}`,
        {
          name: this.projectName,
          description: this.description,
          active: this.active,
          team: this.project.team,
        }
      )
      .subscribe({
        error: (e) => {
          console.log(e);
          this.result = 'something went wrong';
        },
        complete: () => {
          window.location.reload();
          this.exit();
        },
      });
  }

  createProject() {
    this.http
      .post(
        `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/project`,
        {
          name: this.projectName,
          description: this.description,
          active: this.active,
          team: this.team,
        }
      )
      .subscribe({
        error: (e) => {
          console.log(e);
          this.result = 'something went wrong';
        },
        complete: () => {
          window.location.reload();
          this.exit();
        },
      });
  }

  exit() {
    this.updateOverlay.emit();
  }
}

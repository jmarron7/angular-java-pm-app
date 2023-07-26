import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrls: ['./create-project-overlay.component.css'],
})
export class CreateProjectOverlayComponent implements OnInit {
  // just for testing
  admin: boolean = true;
  //
  modalVisible: boolean = true;
  projectName: string = '';
  description: string = '';
  success: boolean = false;
  fail: boolean = false;
  companyId: number = 0;
  active: boolean = true;
  teamProjects: any;
  @Input() teamId: number = 0;
  @Input() project: any;
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
    else this.getTeamData();
  }

  getTeamData() {
    this.http
      .get(
        `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects`
      )
      .subscribe({
        next: (data: any) => {
          this.teamProjects = data[0];
        },
        error: (e) => {
          console.log(e);
          this.fail = true;
          setTimeout(() => {
            this.exit();
          }, 700);
        },
        complete: () => this.createProject(),
      });
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
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
          this.fail = true;
          setTimeout(() => {
            this.exit();
          }, 700);
        },
        complete: () => {
          this.success = true;
          setTimeout(() => {
            this.exit();
          }, 700);
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
          team: this.teamProjects.team,
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => {
          console.log(e);
          this.fail = true;
          setTimeout(() => {
            this.exit();
          }, 700);
        },
        complete: () => {
          this.success = true;
          setTimeout(() => {
            this.exit();
          }, 700);
        },
      });
  }

  exit() {
    this.updateOverlay.emit();
  }
}

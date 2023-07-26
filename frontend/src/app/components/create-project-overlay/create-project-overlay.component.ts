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

  // handles the submit click and posts new project if no project came in as input (as it should when edit button is clicked)
  // put, updates project if project field is populated by input (edit button was clicked to get here)
  postOrPut() {
    if (this.project) this.updateProject();
    else {
      this.getTeamData();
    }
  }

  getTeamData() {
    this.http
      .get(
        `http://localhost:8080/company/${this.companyId}/teams/${this.teamId}/projects`
      )
      .subscribe({
        next: (data: any) => {
          this.teamProjects = data[0];
          console.log(this.teamProjects.team);
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

  updateProject() {}

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
          console.log('here');
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
          console.log('complete');
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

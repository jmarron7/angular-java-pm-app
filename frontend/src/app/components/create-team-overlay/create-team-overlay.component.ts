import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicUserDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-create-team-overlay',
  templateUrl: './create-team-overlay.component.html',
  styleUrls: ['./create-team-overlay.component.css'],
})
export class CreateTeamOverlayComponent implements OnInit {
  modalVisible: boolean = true;
  teamName: string = '';
  description: string = '';
  success: boolean = false;
  fail: boolean = false;
  members: Array<any> = [];
  addedMembers: Array<BasicUserDto> = [];
  selectedMember: any = undefined;
  companyId: number = 0;

  @Output() updateOverlay = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('companyId')!);
    if (companyId) this.companyId = companyId;
    this.populateMembers();
  }

  populateMembers() {
    this.http
      .get(`http://localhost:8080/company/${this.companyId}/users`)
      .subscribe({
        next: (data: any) => {
          for (let member of data) this.members.push(member);
        },
        error: (e) => console.log(e),
      });
  }

  addMember() {
    if (this.selectedMember != undefined) {
      if (!this.addedMembers.includes(this.selectedMember))
        this.addedMembers.push(this.selectedMember);
      let index = this.members.indexOf(this.selectedMember);
      if (index != -1) this.members.splice(index, 1);
    }
  }

  removeMember(member: any) {
    let index = this.addedMembers.indexOf(member);
    if (index != -1) {
      this.addedMembers.splice(index, 1);
      this.members.push(member);
    }
  }

  createTeam() {
    this.http
      .post(`http://localhost:8080/company/${this.companyId}/team`, {
        name: this.teamName,
        description: this.description,
        teammates: this.addedMembers,
      })
      .subscribe({
        next: (res) => console.log(res),
        error: (e) => {
          console.log(e);
          this.fail = true;
        },
        complete: () => {
          this.success = true;
          setTimeout(() => {
            this.exit();
            window.location.reload();
          }, 700);
        },
      });
  }

  exit() {
    this.updateOverlay.emit();
  }
}

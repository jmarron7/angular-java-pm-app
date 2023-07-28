import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BasicUserDto } from 'src/app/services/general.service';

@Component({
  selector: 'app-create-team-overlay',
  templateUrl: './create-team-overlay.component.html',
  styleUrls: ['./create-team-overlay.component.css'],
})
export class CreateTeamOverlayComponent implements OnInit {
  modalVisible = true;
  teamName = '';
  description = '';
  success = false;
  fail = false;
  members: Array<any> = [];
  addedMembers: Array<BasicUserDto> = [];
  selectedMember: any = undefined;
  companyId = 0;

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
          for (const member of data) this.members.push(member);
        },
        error: (e) => console.log(e),
      });
  }

  addMember() {
    if (this.selectedMember) {
      if (!this.addedMembers.includes(this.selectedMember))
        this.addedMembers.push(this.selectedMember);
      const index = this.members.indexOf(this.selectedMember);
      if (index != -1) this.members.splice(index, 1);
    }
  }

  removeMember(member: any) {
    const index = this.addedMembers.indexOf(member);
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
        next: (response) => {
          const companyIds = JSON.parse(localStorage.getItem('companyId') as string);
          companyIds.push(JSON.parse(JSON.stringify(response)).id);
          
          localStorage.setItem('companyTeamIds', JSON.stringify(companyIds));
        },
        error: (e) => {
          console.log(e);
          this.fail = true;
        },
        complete: () => {
          this.success = true;
          window.location.reload();
          this.exit();
        },
      });
  }

  exit() {
    this.updateOverlay.emit();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-announcement-overlay',
  templateUrl: './create-announcement-overlay.component.html',
  styleUrls: ['./create-announcement-overlay.component.css'],
})
export class CreateAnnouncementOverlayComponent implements OnInit {
  modalVisible = true;
  title = '';
  message = '';
  result = '';
  submit = false;
  companyId = 0;
  user: any;

  @Output() updateOverlay = new EventEmitter<any>();

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const companyId = JSON.parse(localStorage.getItem('companyId')!);
    if (companyId) this.companyId = companyId;
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) this.user = user;
  }

  post() {
    this.http
      .post(`http://localhost:8080/company/${this.companyId}/announcement`, {
        title: this.title,
        message: this.message,
        author: {
          id: this.user.id,
          profile: {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            phone: this.user.phone,
          },
          admin: this.user.admin,
          active: this.user.active,
          status: this.user.status,
        },
      })
      .subscribe({
        next: () => (this.submit = true),
        error: (e) => {
          console.log(e);
          this.result = 'something went wrong';
          this.submit = true;
        },
        complete: () => {
          this.result = '';
          window.location.reload();
          this.exit();
        },
      });
  }

  exit() {
    this.updateOverlay.emit();
  }
}

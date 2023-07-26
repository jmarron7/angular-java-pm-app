import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-announcement-overlay',
  templateUrl: './create-announcement-overlay.component.html',
  styleUrls: ['./create-announcement-overlay.component.css'],
})
export class CreateAnnouncementOverlayComponent {
  // TODO, dynamically insert data into post request
  isOpen: boolean = true;
  title: string = '';
  message: string = '';
  fail: boolean = false;
  success: boolean = false;
  submit: boolean = false;

  constructor(private http: HttpClient) {}

  post() {
    this.http
      .post('http://localhost:8080/company/6/announcement', {
        title: this.title,
        message: this.message,
        author: {
          id: 18,
          profile: {
            firstName: 'Greg',
            lastName: 'Hirsch',
            email: 'ghirsch@email.com',
            phone: '(000) 000-0000',
          },
          admin: false,
          active: true,
          status: 'JOINED',
        },
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submit = true;
        },
        error: (e) => {
          console.log(e);
          this.fail = true;
          this.submit = true;
        },
        complete: () => {
          (this.success = true),
            setTimeout(() => {
              this.isOpen = false;
            }, 700);
        },
      });
  }
}

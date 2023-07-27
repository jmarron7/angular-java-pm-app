import { Component, EventEmitter, Output } from '@angular/core';
import { UserRequestDto } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user-overlay',
  templateUrl: './add-user-overlay.component.html',
  styleUrls: ['./add-user-overlay.component.css'],
})
export class AddUserOverlayComponent {
  modalVisible: boolean = true;
  user: UserRequestDto = new UserRequestDto();
  result: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  @Output() updateUserOverlayVisibility = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  addUser(form: any) {
    this.user.credentials.username = form.firstName + '.' + form.lastName;
    this.user.credentials.password = form.password;
    this.user.profile.firstName = form.firstName;
    this.user.profile.lastName = form.lastName;
    this.user.profile.email = form.email;
    this.user.profile.phone = form.phoneNumber;
    this.user.admin = form.userIsAdmin;

    let url =
      'http://localhost:8080' +
      '/company/' +
      localStorage.getItem('companyId') +
      '/user';
    this.http.post<any>(url, this.user).subscribe({
      error: (e) => {
        console.log(e);
        this.result = 'required fields (*) missing';
      },
      complete: () => {
        this.result = '';
        setTimeout(() => {
          window.location.reload();
          this.handleOverlayExit();
        }, 500);
      },
    });
  }

  handleOverlayExit() {
    this.updateUserOverlayVisibility.emit();
  }
}

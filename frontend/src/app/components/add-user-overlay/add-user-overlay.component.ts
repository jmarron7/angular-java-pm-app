import { Component, EventEmitter, Output } from '@angular/core';
import { UserRequestDto } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user-overlay',
  templateUrl: './add-user-overlay.component.html',
  styleUrls: ['./add-user-overlay.component.css'],
})
export class AddUserOverlayComponent {
  modalVisible = true;
  user: UserRequestDto = new UserRequestDto();
  result = '';
  firstName = '';
  lastName = '';
  password = '';
  confirmPassword = '';
  email = '';

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

    const url =
      'http://localhost:8080' +
      '/company/' +
      localStorage.getItem('companyId') +
      '/user';
    this.http.post<any>(url, this.user).subscribe({
      error: (e) => {
        console.log(e);
        this.result = 'something went wrong';
      },
      complete: () => {
        this.result = '';
        window.location.reload();
        this.handleOverlayExit();
      },
    });
  }

  handleOverlayExit() {
    this.updateUserOverlayVisibility.emit();
  }
}

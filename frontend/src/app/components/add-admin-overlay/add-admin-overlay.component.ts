import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-admin-overlay',
  templateUrl: './add-admin-overlay.component.html',
  styleUrls: ['./add-admin-overlay.component.css'],
})
export class AddAdminOverlayComponent {
  modalVisible = true;
  result = '';
  email = '';

  @Output() updateAdminOverlayVisibility = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  handleOverlayExit() {
    this.updateAdminOverlayVisibility.emit();
  }

  addAdmin(form: any) {
    const url =
      'http://localhost:8080' +
      '/company/' +
      JSON.parse(localStorage.getItem('companyId') as string) +
      '/user/';
    this.http.put<any>(url, form.email).subscribe({
      error: (e) => {
        console.error(e);
        this.result = e.error.message;
      },
      complete: () => {
        this.result = '';
        window.location.reload();
      },
    });
  }
}

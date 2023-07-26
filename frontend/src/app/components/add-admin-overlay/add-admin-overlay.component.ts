import { Component, EventEmitter, Output } from '@angular/core';
import { GeneralService, UserRequestDto } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-add-admin-overlay',
  templateUrl: './add-admin-overlay.component.html',
  styleUrls: ['./add-admin-overlay.component.css']
})
export class AddAdminOverlayComponent {
  modalVisible: boolean = true;
  
  @Output() updateAdminOverlayVisibility = new EventEmitter<any>()

  constructor(private generalService: GeneralService, private http: HttpClient) {}

  handleOverlayExit() {
    this.updateAdminOverlayVisibility.emit()
  }

  addAdmin(form: any) {
    let url = 'http://localhost:8080' +'/users/' + form.email;
    this.http.get<any>(url).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    })
  }

}

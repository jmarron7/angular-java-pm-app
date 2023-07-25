import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {

  announcements: any[] = [1,2,3,4];
  companyId = '';

  constructor(private http: HttpClient, private router: Router) { 
    let input = this.router.getCurrentNavigation();
    this.companyId = input?.extras?.state?.['companyId'];
    localStorage.setItem('companyId', this.companyId);
  } 

  ngOnInit() {
    let url = 'company/' + this.companyId +  'announcements';
    this.http.get<any>(url).subscribe({
        next: data => {
            this.announcements = data;
        },
        error: error => {
            console.error(error);
          }
      })
  }
}

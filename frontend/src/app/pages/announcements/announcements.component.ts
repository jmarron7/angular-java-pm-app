import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Announcement {
  name: string;
  date: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent {
  announcements: Announcement[] = [];
  isCreatingPost: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    let url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/announcements';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.announcements = data.map((announcement: any) => {
          return {
            name:
              announcement.author.profile.firstName +
              ' ' +
              announcement.author.profile.lastName,
            date: new Date(announcement.date).toDateString(),
            title: announcement.title,
            content: announcement.message,
          };
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

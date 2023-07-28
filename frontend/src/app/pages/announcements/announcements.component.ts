import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Announcement {
  name: string;
  date: Date;
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
  showOverlay = false;
  isAdmin = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.isAdmin = JSON.parse(localStorage.getItem('user') as string).admin;
    const url =
      'http://localhost:8080/company/' +
      localStorage.getItem('companyId') +
      '/announcements';
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.announcements = data.map((announcement: any) => {
          return {
            name:
              announcement.author.profile.firstName +
              ' ' +
              announcement.author.profile.lastName,
            date: new Date(announcement.date),
            title: announcement.title,
            content: announcement.message,
          };
        });
        this.announcements.sort((a: Announcement, b: Announcement) =>
          a.date > b.date ? -1 : 1
        );
      },
      error: (e) => console.error(e),
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

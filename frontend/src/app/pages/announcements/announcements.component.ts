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
  showOverlay: boolean = false;

  constructor(private http: HttpClient) {}

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
            date: new Date(announcement.date),
            title: announcement.title,
            content: announcement.message,
          };
        });
        this.announcements.sort((a: Announcement, b: Announcement) =>
          a.date > b.date ? -1 : 1
        );
        console.log(this.announcements);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}

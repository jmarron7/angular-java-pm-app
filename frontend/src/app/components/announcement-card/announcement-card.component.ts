import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css'],
})
export class AnnouncementCardComponent {
  @Input() name: string = '';
  @Input() content: string = '';
  @Input() date: Date = new Date();
  @Input() title: string = '';

  displayedDate: string = '';

  ngOnInit() {
    this.displayedDate = this.date.toDateString();
  }
}

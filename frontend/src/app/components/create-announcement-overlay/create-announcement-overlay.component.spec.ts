import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementOverlayComponent } from './create-announcement-overlay.component';

describe('CreateAnnouncementOverlayComponent', () => {
  let component: CreateAnnouncementOverlayComponent;
  let fixture: ComponentFixture<CreateAnnouncementOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAnnouncementOverlayComponent]
    });
    fixture = TestBed.createComponent(CreateAnnouncementOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

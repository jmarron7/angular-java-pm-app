import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectOverlayComponent } from './create-project-overlay.component';

describe('CreateProjectOverlayComponent', () => {
  let component: CreateProjectOverlayComponent;
  let fixture: ComponentFixture<CreateProjectOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectOverlayComponent]
    });
    fixture = TestBed.createComponent(CreateProjectOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectOverlayComponent } from './edit-project-overlay.component';

describe('EditProjectOverlayComponent', () => {
  let component: EditProjectOverlayComponent;
  let fixture: ComponentFixture<EditProjectOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProjectOverlayComponent]
    });
    fixture = TestBed.createComponent(EditProjectOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

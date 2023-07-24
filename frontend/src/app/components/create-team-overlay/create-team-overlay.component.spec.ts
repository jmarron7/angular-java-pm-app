import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamOverlayComponent } from './create-team-overlay.component';

describe('CreateTeamOverlayComponent', () => {
  let component: CreateTeamOverlayComponent;
  let fixture: ComponentFixture<CreateTeamOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeamOverlayComponent]
    });
    fixture = TestBed.createComponent(CreateTeamOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

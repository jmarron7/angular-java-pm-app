import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminOverlayComponent } from './add-admin-overlay.component';

describe('AddAdminOverlayComponent', () => {
  let component: AddAdminOverlayComponent;
  let fixture: ComponentFixture<AddAdminOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdminOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

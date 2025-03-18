import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileQuickViewComponent } from './user-profile-quick-view.component';

describe('UserProfileQuickViewComponent', () => {
  let component: UserProfileQuickViewComponent;
  let fixture: ComponentFixture<UserProfileQuickViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileQuickViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDropDownComponent } from './notification-drop-down.component';

describe('NotificationDropDownComponent', () => {
  let component: NotificationDropDownComponent;
  let fixture: ComponentFixture<NotificationDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationDropDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

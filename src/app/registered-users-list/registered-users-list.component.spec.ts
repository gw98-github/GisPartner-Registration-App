import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUsersListComponent } from './registered-users-list.component';

describe('RegisteredUsersListComponent', () => {
  let component: RegisteredUsersListComponent;
  let fixture: ComponentFixture<RegisteredUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

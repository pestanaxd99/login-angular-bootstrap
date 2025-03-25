import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotLogguedComponent } from './not-loggued.component';

describe('NotLogguedComponent', () => {
  let component: NotLogguedComponent;
  let fixture: ComponentFixture<NotLogguedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotLogguedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotLogguedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarklightThemeComponent } from './darklight-theme.component';

describe('DarklightThemeComponent', () => {
  let component: DarklightThemeComponent;
  let fixture: ComponentFixture<DarklightThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DarklightThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarklightThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

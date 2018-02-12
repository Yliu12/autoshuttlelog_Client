import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogentryComponent } from './logentry.component';

describe('LogentryComponent', () => {
  let component: LogentryComponent;
  let fixture: ComponentFixture<LogentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

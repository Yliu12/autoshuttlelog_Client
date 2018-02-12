import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleinfoComponent } from './shuttleinfo.component';

describe('ShuttleinfoComponent', () => {
  let component: ShuttleinfoComponent;
  let fixture: ComponentFixture<ShuttleinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuttleinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

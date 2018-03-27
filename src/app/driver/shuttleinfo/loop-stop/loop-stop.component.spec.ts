import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopStopComponent } from './loop-stop.component';

describe('LoopStopComponent', () => {
  let component: LoopStopComponent;
  let fixture: ComponentFixture<LoopStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopStopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-logentry',
  templateUrl: './logentry.component.html',
  styleUrls: ['./logentry.component.css'],
  providers: [DatePipe]
})
export class LogentryComponent implements OnInit {

  gLoopStops = [
    'Notrh Shelter - N',
    'Anthony - N',
    'Alumni',
    'Stadium',
    'Scheidler'];
  logLine = {
    stop: '',
    time: Date.now(),
    boarded: 0,
    left:0
  };
  log = [];


  constructor() {
    setInterval(() => {
      this.logLine.time = Date.now();
    }, 1000);
  }

  @Input()
  userinfo;

  @Input()
  shuttleInfo;

  ngOnInit() {
  }

  onClickStopOption(stop) {
    this.logLine.stop = stop;
    console.log(stop);
  }

  onClickEnter() {
    this.log.push(this.logLine);
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LogService} from '../service/logs.service';
import {Log} from '../service/log';


@Component({
  selector: 'app-logentry',
  templateUrl: './logentry.component.html',
  styleUrls: ['./logentry.component.css'],
  providers: [DatePipe, LogService]
})
export class LogentryComponent implements OnInit {

  gLoopStops = [
    'Notrh Shelter - N',
    'Anthony - N',
    'Alumni',
    'Stadium',
    'Scheidler'];
  logLine = new Log();
  logs: Log[] = [];


  constructor(private logService: LogService) {
    setInterval(() => {
      this.logLine.time = Date.now();
    }, 1000);

    this.logs = this.logService.getLogs();


    // this.logService.getLogs().subscribe(
    //   data => {
    //     console.log('Sibling1Component-received from sibling2: ' + data);
    //     this.searchCaseNumber = data;
    //     this.sibling1Form.patchValue({
    //       caseNumber: data
    //     });
    //   });

  }

  @Input()
  userinfo;

  @Input()
  shuttleInfo;

  ngOnInit() {
    this.logLine.numberBoarded = 0;
    this.logLine.numberLeft = 0;
    this.logLine.stop = this.shuttleInfo.stop;
  }

  onClickStopOption(stop) {
    this.logLine.stop = stop;
    console.log(stop);
  }

  onClickEnter() {
    this.logService.addLog(this.logLine);
    this.logService.sendLogs();
  }

}

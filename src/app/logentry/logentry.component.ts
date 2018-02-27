import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LogService} from '../service/logs.service';
import {Log} from '../service/log';
import {User} from '../service/user';
import {UserService} from '../service/user.service';

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
  logLine = new Log();
  logs: Log[] = [];


  userinfo: User;

  constructor(private logService: LogService, private userService: UserService) {
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
  shuttleInfo;

  ngOnInit() {
    this.getUser();
    this.logLine = new Log();
    this.logLine.time = Date.now();
    this.logLine.stop = this.shuttleInfo.stop;
  }

  onClickStopOption(stop) {
    this.logLine.stop = stop;
    console.log(stop);
  }

  onClickEnter() {
    this.logLine.driver = this.userinfo.userName;
    this.logLine.busId = this.shuttleInfo.id;
    this.logLine.position = this.shuttleInfo.position;
    this.logLine.loopName = this.shuttleInfo.loopName;
    this.logLine.stop = this.shuttleInfo.stop;
    this.logService.addLog(this.logLine);
    const numberofStop = this.gLoopStops.indexOf(this.logLine.stop);
    this.logLine = new Log();
    const nextStopIndex = (numberofStop === this.gLoopStops.length - 1 ? this.gLoopStops[0] : numberofStop + 1).toString();
    this.shuttleInfo.stop = this.gLoopStops[nextStopIndex];
    this.logLine.stop = this.shuttleInfo.stop;

    // TODO move to timer in app.component
    this.logService.sendLogs();
  }

  getUser(): void {
    this.userService.getUserObservable()
      .subscribe(user => {
        this.userinfo = user;
      });
  }

}

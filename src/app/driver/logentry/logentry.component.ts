import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {LogService} from '../service/logs.service';
import {Log} from '../service/log';
import {User} from '../service/user';
import {UserService} from '../service/user.service';
import {LoopStopComponent} from "../shuttleinfo/loop-stop/loop-stop.component";

@Component({
  selector: 'app-logentry',
  templateUrl: './logentry.component.html',
  styleUrls: ['./logentry.component.css'],
  providers: [DatePipe]
})
export class LogentryComponent implements OnInit {

  @Output() pageSelected = new EventEmitter<string>();
  @Input() shuttleInfo;
  @ViewChild(LoopStopComponent) stopLoop: LoopStopComponent;

  showSuccessCover: boolean;

  logLine = new Log();
  logs: Log[] = [];
  toNextStation: Function;

  userinfo: User = new User();

  constructor(private logService: LogService, private userService: UserService) {
    setInterval(() => {
      this.logLine.time = Date.now();
    }, 1000);

    setInterval(() => {
      this.logService.sendLogs();
    }, 6 * 1000);

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


  ngOnInit() {
    this.getUser();
    this.showSuccessCover = false;
    this.logLine = new Log();
    this.logLine.time = Date.now();
  }

  onClickStopOption(stop) {
    this.shuttleInfo.stop = stop;
    console.log(stop);
  }

  onClickEnter() {
    this.showSuccessCover = true;
    setTimeout(() => {
      this.disableSuccessCover();
    }, 2000);

    // assembly logline
    this.logLine.driver = this.userinfo.userName;
    this.logLine.busId = this.shuttleInfo.id;
    this.logLine.position = this.shuttleInfo.position;
    this.logLine.loopName = this.shuttleInfo.loop;
    this.logLine.stop = this.shuttleInfo.stop;
    this.logService.addLog(this.logLine);

    this.stopLoop.goToNextStop();
    this.logLine = new Log();


    // update shuttle info

  }

  disableSuccessCover() {
    this.showSuccessCover = false;
  }

  getUser(): void {
    this.userService.getUserObservable()
      .subscribe(user => {
        if (!user || !user.userName) {
          this.pageSelected.emit('logIn');
          return;
        }
        this.userinfo = Object.assign({}, user);
        this.logService.setToken(this.userinfo.token);
        console.log('user Updated');
      });
  }

}

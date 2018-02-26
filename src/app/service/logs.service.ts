import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';


import {Log} from './log';
import {AppGlobals} from './app.global';


@Injectable()
export class LogService {

  private logsUrl = '/logs';  // URL to web api

  // Observable string sources
  private logs: Log[] = [];
  private serivceUrl = '';

  private httpOptions = {};

  // Observable string streams

  constructor(private http: HttpClient, private _global: AppGlobals) {
    this.serivceUrl = this._global.baseAPIUrl + this.logsUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getLogsObservable(): Observable<Log[]> {
    return of(this.logs);
  }

  getLogs(): Log[] {
    return this.logs.slice();
  }

  addLog(log) {
    this.logs.push(log);
  }

  private postLogs() {
    console.log(this.logs);
    console.log(this.httpOptions);
    return this.http.post(this.serivceUrl, this.logs, this.httpOptions);
  }

  sendLogs() {
    this.postLogs().subscribe(
      data => {
        this.logs = [];
      }
    );
  }

}

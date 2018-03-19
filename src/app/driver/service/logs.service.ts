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

  private token: string;
  private serivceUrl = '';


  // Observable string streams

  constructor(private http: HttpClient, private _global: AppGlobals) {
    this.serivceUrl = this._global.baseAPIUrl + this.logsUrl;


  }

  getLogsObservable(): Observable<Log[]> {
    return of(this.logs);
  }

  getLogs(): Log[] {
    return this.logs.slice();
  }

  setToken(token: string) {
    this.token = token;
  }

  addLog(log) {
    this.logs.push(log);
  }

  private postLogs() {


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.token
      })
    };


    console.log(this.logs);
    //console.log(this.httpOptions);
    return this.http.post(this.serivceUrl,
      {'logList': this.logs}
      , httpOptions).timeout(5000);
  }

  sendLogs() {
    if (this.logs.length === 0) {
      return;
    }
    this.postLogs().subscribe(
      data => {
        this.logs = [];
      }
    );
  }

}

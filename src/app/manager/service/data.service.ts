import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';


import {Log} from './log';
import {AppGlobals} from '../../driver/service/app.global';

@Injectable()
export class DataService {
  private logsUrl = '/log';  // URL to web api
  private serivceUrl = '';

  private httpOptions = {};

  private _logs = new BehaviorSubject<Log[]>([new Log()]);

  constructor(private http: HttpClient, private _global: AppGlobals) {
    this.serivceUrl = this._global.baseAPIUrl + this.logsUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.getLogs();
    setInterval(() => {
      this.getLogs();
    }, 10000);

  }

  getLogsObservable(): Observable<Log[]> {
    return this._logs.asObservable();
  }

  private getLogs() {
    this.http.get(this.serivceUrl).subscribe(
      data => {
        this._logs.next(data as Log[]);
      }
    );
  }

}

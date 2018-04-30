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
  private summaryUrl = '/datasummary';


  private logSerivceUrl = '';

  private httpOptions = {};

  private _logs = new BehaviorSubject<Log[]>([new Log()]);

  constructor(private http: HttpClient, private _global: AppGlobals) {
    this.logSerivceUrl = this._global.baseAPIUrl + this.logsUrl;
    this.summaryUrl = this._global.baseAPIUrl + this.summaryUrl;
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
    this.http.get(this.logSerivceUrl).subscribe(
      data => {
        this._logs.next(data as Log[]);
      }
    );
  }

  getsummary(callback) {
    this.http.post(this.summaryUrl, {
      'fromDate': 1524542400000,
      'toDate': Date.now()
    }, this.httpOptions).subscribe(
      data => {
        const summary = {
            hour: {
              'Green Loop': [],
              'Red Loop': [],
              'Blue Loop': []
            },
            stop: {
              'Green Loop': [],
              'Red Loop': [],
              'Blue Loop': []
            },
            total: {
              'Green Loop': {boarded: 0, left: 0},
              'Red Loop': {boarded: 0, left: 0},
              'Blue Loop': {boarded: 0, left: 0},
            }
          }
        ;
        if (data && data['byHour']) {
          const hourlyData = data['byHour'];
          hourlyData.forEach((item) => {
            summary.hour[item.loop].push(item);
            summary.total[item.loop].boarded += item.totalNumBoarded;
            summary.total[item.loop].left += item.totalNumLeft;
          });
        }
        if (data && data['byHour']) {
          const ByStopData = data['byStop'];
          ByStopData.forEach((item) => {
            summary.stop[item.loop].push(item);
          });
        }
        callback(summary);
      });
  }
}

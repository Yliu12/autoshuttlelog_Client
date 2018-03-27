import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Md5} from 'ts-md5/dist/md5';

import {AppGlobals} from './app.global';
import {User} from './user';
import {Loop} from './loop';

@Injectable()
export class LoopService {
  private loops: Loop[] = [];

  private loop = new BehaviorSubject<Loop[]>(this.loops);

  private loopInfoUrl = '/loops';

  private serivceUrl = '';

  private httpOptions = {};


  constructor(private http: HttpClient, private _global: AppGlobals) {

    this.serivceUrl = this._global.baseAPIUrl + this.loopInfoUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  readLoopInfoFromStorage() {
    const loopStr = localStorage.getItem('LOOPS');
    if (loopStr) {
      const loop = JSON.parse(loopStr);

      this.loop.next(loop);
    }
  }

  saveLoopInfoStorage(loops: Loop[]) {
    localStorage.setItem('LOOPS', JSON.stringify(loops));
    console.log(JSON.stringify(loops));
  }

  getLoopObservable(): Observable<Loop[]> {
    return this.loop.asObservable();
  }


  setLoop(loops: Loop[]) {
    this.loop.next(loops);
    this.saveLoopInfoStorage(loops);
  }

  private requestLoopInfo() {

    return this.http.get(this.serivceUrl)
      .retryWhen((error) => {
        console.log('retrying');
        return error.delay(1000);
      })
      // .timeoutWith(7000, Observable.throw(new Error('delay exceeded'))) // <------
      ;
  }

  getLoopInfo(callback) {
    this.requestLoopInfo().subscribe(
      data => {
        const loops = data['respBody'];
        if (loops) {
          loops.forEach((value) => {
            value.stops = JSON.parse(value.stops);
          });


          this.setLoop((loops));
          this.loops = loops;
          // callback(loops);
        }
      }
      ,
      err => {
        console.error('Oops:', err.message);
      }
    );
  }

}

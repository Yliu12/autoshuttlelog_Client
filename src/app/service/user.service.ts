import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';


import {AppGlobals} from './app.global';
import {User} from './user';
import {Md5} from 'ts-md5/dist/md5';


@Injectable()
export class UserService {
  private user: User;
  private loginUrl = '/login';

  private serivceUrl = '';

  private httpOptions = {};


  constructor(private http: HttpClient, private _global: AppGlobals) {
    this.serivceUrl = this._global.baseAPIUrl + this.loginUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getUserObservable(): Observable<User> {
    return of(this.user);
  }

  getUser(): User {
    return Object.assign({}, this.user);
  }

  setUser(user: User) {
    this.user = user;
  }

  private requestLogin(user: User) {

    return this.http.post(this.serivceUrl, {
      userName: user.userName,
      password: Md5.hashStr(user.password)
    }, this.httpOptions);
  }

  login(u: User, callback) {
    this.requestLogin(u).subscribe(
      data => {
        if (data['respBody']) {
          this.user = data['respBody'];
        }
        callback(data);
      }
    );
  }
}

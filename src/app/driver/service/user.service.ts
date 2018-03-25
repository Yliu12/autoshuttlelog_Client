import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Md5} from 'ts-md5/dist/md5';

import {AppGlobals} from './app.global';
import {User} from './user';

@Injectable()
export class UserService {
  private user = new BehaviorSubject<User>(new User());

  private loginUrl = '/driverlogin';

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

  readUserFromStorage() {
    const userStr = localStorage.getItem('USER');
    if (userStr) {
      const user = JSON.parse(userStr);

      this.user.next(user);
    }
  }

  saveUserToStorage(user: User) {
    localStorage.setItem('USER', JSON.stringify(user));
    console.log(JSON.stringify(user));
  }

  getUserObservable(): Observable<User> {
    return this.user.asObservable();
  }


  setUser(user: User) {
    this.user.next(user);
    this.saveUserToStorage(user);
  }

  private requestLogin(user: User) {

    return this.http.post(this.serivceUrl, {
      userName: user.userName,
      password: Md5.hashStr(user.password)
    }, this.httpOptions)
      .retryWhen((error) => {
        console.log('retrying');
        return error.delay(1000);
      })
      // .timeoutWith(7000, Observable.throw(new Error('delay exceeded'))) // <------
      ;
  }

  login(u: User, callback) {
    this.requestLogin(u).subscribe(
      data => {
        if (data['respBody']) {
          this.setUser((data['respBody']));
        }
        callback(data);
      }
      ,
      err => {
        console.error('Oops:', err.message);
      }
    );
  }


  logOut() {
    this.user.next(null);
    localStorage.removeItem('USER');
  }


}

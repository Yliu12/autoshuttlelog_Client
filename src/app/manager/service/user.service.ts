import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Md5} from 'ts-md5/dist/md5';

import {AppGlobals} from '../../driver/service/app.global';
import {User} from './user';

@Injectable()
export class UserService {
  private user = new BehaviorSubject<User>(new User());

  private loginUrl = '/managerlogin';
  private userUrl = '/user';

  private serivceUrl = '';
  private userManageUrl = '';
  private httpOptions = {};


  constructor(private http: HttpClient, private _global: AppGlobals) {

    this.serivceUrl = this._global.baseAPIUrl + this.loginUrl;
    this.userManageUrl = this._global.baseAPIUrl + this.userUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }


  getUserObservable(): Observable<User> {
    return this.user.asObservable();
  }


  setUser(user: User) {
    this.user.next(user);
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
      .timeoutWith(3000, Observable.throw(new Error('delay exceeded'))) // <------
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
    this.user.next(new User());
  }


  getUserList(callback) {
    const u = this.user.getValue();
    this.requestUserList(u).subscribe(
      data => {
        if (data['respBody']) {
          callback(data['respBody']);
        }
      }
      ,
      err => {
        console.error('Oops:', err.message);
      }
    );
  }

  private requestUserList(user: User) {
    const header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': user.token
      })
    };

    return this.http.get(this.userManageUrl, header)
      .retryWhen((error) => {
        console.log('retrying');
        return error.delay(1000);
      })
      .timeoutWith(3000, Observable.throw(new Error('delay exceeded'))) // <------
      ;
  }

  addUser(u: User, callback) {
    if (!this.user.getValue() || !this.user.getValue().token) {
      return 'Please Login';
    }
    this.requestAddUserList(u).subscribe(
      data => {
        if (data) {
          console.log(data);
          callback(data);
        }
      }
      ,
      err => {
        console.error('Oops:', err.message);
      }
    );
  }

  private requestAddUserList(user: User) {
    const header = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': this.user.getValue().token
        })
      }
    ;

    return this.http.post(this.userManageUrl, user, header);
  }

  deleteUser(u: User, callback) {
    if (!this.user.getValue() || !this.user.getValue().token) {
      return 'Please Login';
    }
    this.requestDeleteUser(u).subscribe(
      data => {
        if (data) {
          console.log(data);

          callback(data);
        }
      }
      ,
      err => {
        console.error('Oops:', err.message);
      }
    );
  }


  private requestDeleteUser(user: User) {

    const deleteurl = this.userManageUrl + '/' + user.id;
    return this.http.delete(deleteurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': this.user.getValue().token
      })
    });
  }
}

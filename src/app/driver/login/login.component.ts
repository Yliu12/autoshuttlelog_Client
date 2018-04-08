import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {User} from '../service/user';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []

})
export class LoginComponent implements OnInit {

  @Input() shuttleInfo;
  @Output() pageSelected = new EventEmitter<string>();

  loopDdlValues = [
    {key: 'G', val: 'Green Loop'},
    {key: 'R', val: 'Red Loop'},
    {key: 'S', val: 'Sunday Loop'},
    {key: 'B', val: 'Blue Loop'}
  ];
  login = {
    username: '',
    password: '',
    loop: '',
    stop: '',
    position: '',
  };
  userinfo = new User;
  formValidation = {
    userName: true,
    password: true,
    position: true,
    busID: true
  };
  displayErrorMessage;

  gLoopStops = [
    'Notrh Shelter - N',
    'Anthony - N',
    'Alumni',
    'Stadium',
    'Scheidler'];


  constructor(private userService: UserService) {

  }

  ngOnInit() {

    // drivers login at office.
    // this.retoreDataFromStorage();

  }

  onClickLogin() {


    if (!this.formIsValid()) {
      return;
    }
    this.userinfo.userName = this.login.username;
    this.userinfo.password = this.login.password;
    this.shuttleInfo.position = this.login.position;

    // ONLINE VERSION CODE
    const loginResult = this.userService.login(this.userinfo, (data) => {
      console.log(data);

      if (!data) {
        this.displayErrorMessage = 'unknow error occured';
      }
      if (data['error']) {
        const e = data['error'];
        this.displayErrorMessage = e.msgDes;
        return;
      }
      if (data['respBody']) {
        this.pageSelected.emit('logEntry');
      }
    });

    // save shuttle info
    localStorage.setItem('SHUTTLEINFO', JSON.stringify(this.shuttleInfo));


    // OFFLINE CODE
    // this.userService.setUser(this.userinfo);
    // this.pageSelected.emit('logEntry');
  }

  formIsValid() {

    this.formValidation = {
      userName: true,
      password: true,
      position: true,
      busID: true
    };

    if (this.login.username == null || this.login.username === '') {
      this.formValidation.userName = false;
    }
    if (this.login.password == null || this.login.password === '') {
      this.formValidation.password = false;
    }
    if (this.login.position == null || this.login.position === '') {
      this.formValidation.position = false;
    }
    if (this.login.position == null || this.login.position === '') {
      this.formValidation.position = false;
    }
    if (this.shuttleInfo.id == null || this.shuttleInfo.id === '') {
      this.formValidation.busID = false;
    }

    if (this.formValidation.position && this.formValidation.password && this.formValidation.userName && this.formValidation.busID) {
      return true;
    }
    return false;

  }

  onClickLoopOption(option) {
    this.login.loop = option;
    console.log(option);
  }

  onClickStopOption(stop) {
    this.login.stop = stop;
    console.log(stop);
  }

  // getUser(): void {
  //   this.userService.getUserObservable()
  //     .subscribe(user => {
  //       if (user && user.userName) {
  //         this.onNavigate('logEntry');
  //         console.log('Recieve User' + JSON.stringify(user, null, 2));
  //         return;
  //       }
  //     });
  // }
  retoreDataFromStorage() {
    const shuttle = JSON.parse(localStorage.getItem('SHUTTLEINFO'));

    if (shuttle && shuttle.loop) {
      this.shuttleInfo = shuttle;
    }

  }
}

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
    position: true
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
    this.login.loop = this.shuttleInfo.loop;
    this.login.stop = this.shuttleInfo.stop;
  }

  onClickLogin() {


    if (!this.formIsValid()) {
      return;
    }
    this.userinfo.userName = this.login.username;
    this.userinfo.password = this.login.password;
    this.shuttleInfo.loop = this.login.loop;
    this.shuttleInfo.this = this.login.stop;
    this.shuttleInfo.position = this.login.position;

    const loginResult = this.userService.login(this.userinfo, (data) => {
      console.log(data);

      if (!data) {
        this.displayErrorMessage = 'unknow error occured';
      }
      if (data['error']) {
        const e = data['error'];
        this.displayErrorMessage = e.msgDes;
      }
      if (data['respBody']) {
        this.pageSelected.emit('logEntry');
      }
    });
  }

  formIsValid() {

    this.formValidation = {
      userName: true,
      password: true,
      position: true
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

    if (this.formValidation.position && this.formValidation.password && this.formValidation.userName) {
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
}
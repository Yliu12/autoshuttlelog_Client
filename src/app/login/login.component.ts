import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userinfo: {
    username: string,
    password: string,
    token: string
  };
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
    position: '',
    loop: '',
    stop: ''
  };
  formValidation = {
    userName: true,
    password: true,
    position: true
  };

  gLoopStops = [
    'Notrh Shelter - N',
    'Anthony - N',
    'Alumni',
    'Stadium',
    'Scheidler'];


  constructor() {
  }

  ngOnInit() {
    this.login.loop = this.shuttleInfo.loop;
    this.login.stop = this.shuttleInfo.stop;
  }

  onClickLogin() {


    if (!this.formIsValid()) {
      return;
    }
    this.userinfo.username = this.login.username;
    this.userinfo.password = this.login.password;
    this.shuttleInfo.loop = this.login.loop;
    this.shuttleInfo.stop = this.login.stop;

    this.pageSelected.emit('logEntry');
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

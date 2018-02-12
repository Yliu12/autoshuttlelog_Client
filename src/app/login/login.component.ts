import {Component, OnInit, Input} from '@angular/core';

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

  login = {
    username: '',
    password: '',
    position: '',
    loop: 'Green Loop',
    stop: 'Scheidler'
  };
  loopDdlValues = [
    {key: 'G', val: 'Green Loop'},
    {key: 'R', val: 'Red Loop'},
    {key: 'S', val: 'Sunday Loop'},
    {key: 'B', val: 'Blue Loop'}
  ];

  gLoopStops = [
    'Notrh Shelter - N',
    'Anthony - N',
    'Alumni',
    'Stadium',
    'Scheidler'];


  constructor() {
  }

  ngOnInit() {
  }

  onClickLogin() {
    this.userinfo.username = this.login.username;
    this.userinfo.password = this.login.password;
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

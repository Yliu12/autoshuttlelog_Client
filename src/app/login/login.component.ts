import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

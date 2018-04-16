import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserService} from './service/user.service';
import {DataService} from './service/data.service';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [DataService, DatePipe, UserService]
})

export class ManagerComponent implements OnInit {

  JSON;
  loadedPage = 'dashboard';

  constructor() {

    this.JSON = JSON;
  }

  onNavigate(page: string) {
    this.loadedPage = page;
    console.log('change page' + page);
  }

  onNav(page: string) {
    this.loadedPage = page;
    console.log('onNav change page ' + page);
  }


  ngOnInit() {
  }
}

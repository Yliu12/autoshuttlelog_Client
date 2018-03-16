import {Component, OnInit} from '@angular/core';
import {LogService} from './service/logs.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [LogService, UserService]
})
export class DriverComponent implements OnInit {

  loadedPage = 'logIn';
  title = 'app';
  shuttle = {
    id: '',
    loop: 'Green Loop',
    stop: 'Shiedler',
    position: ''
  };

  properties = {
    shuttle: this.shuttle
  };

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.getUser();
    this.userService.readUserFromStorage();
    this.shuttle = JSON.parse(localStorage.getItem('SHUTTLEINFO'));
    this.retoreDataFromStorage();

  }


  retoreDataFromStorage() {
    const shuttle = JSON.parse(localStorage.getItem('SHUTTLEINFO'));

    if (shuttle && shuttle.loop) {
      this.shuttle = shuttle;
    }

  }

  onNavigate(page: string) {
    this.loadedPage = page;
  }

  getUser(): void {
    this.userService.getUserObservable()
      .subscribe(user => {
        if (user && user.userName) {
          this.onNavigate('logEntry');
          console.log('Recieve User' + JSON.stringify(user, null, 2));
          return;
        }
      });
  }
}

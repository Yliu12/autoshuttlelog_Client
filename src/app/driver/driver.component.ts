import {Component, OnInit} from '@angular/core';
import {LogService} from './service/logs.service';
import {UserService} from './service/user.service';
import {LoopService} from './service/loop.service';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [LogService, UserService, LoopService]
})
export class DriverComponent implements OnInit {

  loadedPage = 'logIn';
  title = 'app';
  shuttle = {
    id: '',
    loop: '',
    stop: '',
    position: '',
    driverName: ''
  };

  properties = {
    shuttle: this.shuttle
  };

  constructor(private userService: UserService, private loopService: LoopService) {

  }

  ngOnInit() {
    this.getUser();
    this.userService.readUserFromStorage();
    this.getLoopData();

    this.loopService.getLoopInfo();
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

  getLoopData() {

    //  Get Loops & Stops
    this.loopService.getLoopObservable().subscribe(
      (loops) => {
        if (loops.length === 0) {
          return;
        }
        this.shuttle.loop = this.shuttle.loop === '' ? loops[0].loopName : this.shuttle.loop;
        this.shuttle.stop = this.shuttle.stop === '' ? loops[0].stops[0] : this.shuttle.stop;
      }
    );
  }
}

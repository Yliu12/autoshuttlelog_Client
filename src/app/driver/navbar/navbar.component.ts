import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../service/user';
import {LogService} from "../service/logs.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() pageSelected = new EventEmitter<string>();
  @Input() onselectPge;
  userinfo: User = null;
  logSize = 0;

  constructor(private userService: UserService, private logService: LogService) {

  }

  ngOnInit() {
    this.getUser();
  }

  onSelect(page: string) {
    if (page === 'logOut') {
      this.userService.logOut();
      page = 'logIn';
    }

    this.onselectPge = page;
    this.pageSelected.emit(page);
  }

  /**
   * return to login page after logout
   */
  getUser(): void {
    this.userService.getUserObservable()
      .subscribe(user => {
        this.userinfo = user;
        if (!user || !user.userName) {
          this.pageSelected.emit('logIn');
        }
      });
  }

  logoutTabOnClick() {
    let savedlog = this.logService.getLogs();
    this.logSize = savedlog.length;
    this.logService.sendLogs();
    if (this.logSize === 0) {
      return;
    }
    const logSizeInterval = setInterval(() => {

      savedlog = this.logService.getLogs();
      this.logSize = savedlog.length;

      if (this.logSize === 0) {
        clearInterval(logSizeInterval);
      }
    }, 1 * 1000);

  }
}

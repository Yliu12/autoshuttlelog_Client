import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../service/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() pageSelected = new EventEmitter<string>();
  @Input() onselectPge;
  userinfo: User = null;

  constructor(private userService: UserService) {

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
}

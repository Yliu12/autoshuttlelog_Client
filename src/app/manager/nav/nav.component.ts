import {Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {User} from '../service/user';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  @Output() changePage = new EventEmitter<string>();
  @Output() testChange = new EventEmitter();
  @Input() onselectPage;

  @ViewChild('closeLogin') closeLogin: ElementRef;

  formValidation = {
    username: true,
    password: true,
  };
  displayErrorMessage;
  user: User;

  login = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  onSelectPage(page: string) {
    this.onselectPage = page;
    this.changePage.emit(page);
    this.testChange.emit(page);
  }


  getUser(): void {
    this.userService.getUserObservable().subscribe(user => {
      this.user = user;
      if (user && user.userName) {
        console.log('Recieve User' + JSON.stringify(user, null, 2));
        return;
      }
    });
  }

  loginOnClick() {
    this.formValidation = {
      username: true,
      password: true,
    };

    if (this.login.username == null || this.login.username === '') {
      this.formValidation.username = false;
    }
    if (this.login.password == null || this.login.password === '') {
      this.formValidation.password = false;
    }
    if (this.formValidation.username && this.formValidation.password) {
      this.userService.login(new User(this.login.username, this.login.password), (data) => {
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
          this.closeLogin.nativeElement.click();
        }
      });
    }
  }

  logOutOnClick() {
    this.userService.logOut();
  }
}

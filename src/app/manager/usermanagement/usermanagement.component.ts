import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {User} from '../service/user';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  userList: User[];
  newUser: User = new User();
  displayErrorMessage: String;
  displayMessage: String;
  formValidation = {
    userName: true,
    password: true,
    firstName: true,
    lastName: true
  };

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList((data) => {
      this.userList = data;
    });
  }

  onClickAddUser() {
    if (!this.formIsValid()) {
      return;
    }
    this.newUser.password = Md5.hashStr(this.newUser.password).toString();
    this.newUser.role = 'DRIVER';
    this.userService.addUser(this.newUser, (data) => {
      if (data['respBody']) {
        this.newUser = new User();
        this.displayErrorMessage = 'New User Added';
        this.getUserList();
      } else {
        this.displayErrorMessage = data['error'].msgDes;
      }

    });

  }

  formIsValid() {

    this.formValidation = {
      userName: true,
      password: true,
      firstName: true,
      lastName: true
    };


    if (this.newUser.userName == null || this.newUser.userName === '') {
      this.formValidation.userName = false;
    }
    if (this.newUser.password == null || this.newUser.password === '') {
      this.formValidation.password = false;
    }
    if (this.newUser.firstName == null || this.newUser.firstName === '') {
      this.formValidation.firstName = false;
    }
    if (this.newUser.lastName == null || this.newUser.lastName === '') {
      this.formValidation.lastName = false;
    }


    return (this.formValidation.userName && this.formValidation.password && this.formValidation.firstName && this.formValidation.lastName);
  }


  deleteUsr(user) {
    this.userService.deleteUser(user, (data) => {
      if (data['respBody']) {
        this.displayMessage = 'User Deleted';
        this.getUserList();
      } else {
        this.displayMessage = data['error'].msgDes;
      }

    });
  }
}

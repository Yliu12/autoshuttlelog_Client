import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() userinfo: {
    username: string,
    password: string,
    token: string
  };
  @Output() pageSelected = new EventEmitter<string>();
  onselectPge = 'logIn';

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(page: string) {
    this.onselectPge = page;
    this.pageSelected.emit(page);
  }

}

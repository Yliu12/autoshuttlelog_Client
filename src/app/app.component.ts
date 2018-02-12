import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPage = 'logIn';
  title = 'app';
  user = {
    'username': '',
    'password': '',
    'token': ''
  };

  onNavigate(page: string ) {
    this.loadedPage = page;
  }

}

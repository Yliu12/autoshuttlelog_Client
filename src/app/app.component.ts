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

  shuttle = {
    id: '',
    loop: 'Green Loop',
    stop: 'Shiedler'
  };

  properties = {
    user: this.user,
    shuttle: this.shuttle
  };


  onNavigate(page: string) {
    this.loadedPage = page;
  }

}

import {Component} from '@angular/core';
import {LogService} from './service/logs.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LogService, UserService]
})
export class AppComponent {
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


  onNavigate(page: string) {
    this.loadedPage = page;
  }

}

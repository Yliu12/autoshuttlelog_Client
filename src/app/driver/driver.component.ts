import {Component} from '@angular/core';
import {LogService} from './service/logs.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [LogService, UserService]
})
export class DriverComponent {
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

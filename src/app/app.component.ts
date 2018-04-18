import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
  }

  ngOninit() {
    this.swUpdate.available.subscribe(event => {
      console.log('A newer version is now available. Refresh the page now to update the cache');
    });
    this.swUpdate.checkForUpdate();
  }
}

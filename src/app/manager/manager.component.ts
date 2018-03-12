import {Component, OnInit} from '@angular/core';
import {DataService} from './service/data.service';
import {Log} from './service/log';


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [DataService]
})

export class ManagerComponent implements OnInit {


  logs: Log[];
  JSON;
  constructor(private dataService: DataService) {

    this.JSON = JSON;
  }

  ngOnInit() {
    this.getLogs();
  }

  getLogs(): void {
    this.dataService.getLogsObservable().subscribe(data => {
      this.logs = data;
    });
  }
}

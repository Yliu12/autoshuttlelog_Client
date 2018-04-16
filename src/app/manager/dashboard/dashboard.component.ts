import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {Log} from '../service/log';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  logs: Log[];

  constructor(private dataService: DataService) {
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

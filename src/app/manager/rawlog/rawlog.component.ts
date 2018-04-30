import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {Log} from '../service/log';

@Component({
  selector: 'app-rawlog',
  templateUrl: './rawlog.component.html',
  styleUrls: ['./rawlog.component.css']
})
export class RawlogComponent implements OnInit {
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

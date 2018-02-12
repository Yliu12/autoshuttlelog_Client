import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-logentry',
  templateUrl: './logentry.component.html',
  styleUrls: ['./logentry.component.css']
})
export class LogentryComponent implements OnInit {

  constructor() { }
  @Input() userinfo;

  @Input() shuttleInfo;

  ngOnInit() {
  }

}

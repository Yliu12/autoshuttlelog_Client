import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shuttleinfo',
  templateUrl: './shuttleinfo.component.html',
  styleUrls: ['./shuttleinfo.component.css']
})
export class ShuttleinfoComponent implements OnInit {

  @Input() shuttleInfo: {
    id: string,
    loop: string,
    stop: string
  };
  @Output() pageSelected = new EventEmitter<string>();
  formBus = {
    id: '',
    loop: '',
    stop: ''
  };
  loopDdlValues = [
    {key: 'G', val: 'Green Loop'},
    {key: 'R', val: 'Red Loop'},
    {key: 'S', val: 'Sunday Loop'},
    {key: 'B', val: 'Blue Loop'}
  ];

  constructor() {
  }

  ngOnInit() {
    this.formBus.id = this.shuttleInfo.id;
    this.formBus.loop = this.shuttleInfo.loop;

  }

  onClickUpdate() {
    this.shuttleInfo.id = this.formBus.id;
    this.shuttleInfo.loop = this.formBus.loop;
    this.pageSelected.emit('logEntry');

  }

  onClickLoopOption(option) {
    this.formBus.loop = option;
    console.log(option);
  }
}

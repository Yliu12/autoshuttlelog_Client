import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shuttleinfo',
  templateUrl: './shuttleinfo.component.html',
  styleUrls: ['./shuttleinfo.component.css']
})
export class ShuttleinfoComponent implements OnInit {

  @Input() shuttleInfo;
  @Output() pageSelected = new EventEmitter<string>();
  formBus = {
    id: '',
    loop: '',
    stop: '',
    driverName: '',
    position: ''
  };


  constructor() {
  }

  ngOnInit() {
    this.getBusInfo();
    this.formBus.id = this.shuttleInfo.id;
    this.formBus.loop = this.shuttleInfo.loop;
    this.formBus.stop = this.shuttleInfo.stop;
    this.formBus.driverName = this.shuttleInfo.driverName;
  }

  getBusInfo() {
    const busStr = localStorage.getItem('SHUTTLEINFO');
    if (busStr) {
      this.shuttleInfo = JSON.parse(busStr);
    }

  }

  onClickUpdate() {
    this.shuttleInfo.id = this.formBus.id;
    this.shuttleInfo.loop = this.formBus.loop;
    this.shuttleInfo.stop = this.formBus.stop;
    this.shuttleInfo.driverName = this.formBus.driverName;
    this.pageSelected.emit('logEntry');
    localStorage.setItem('SHUTTLEINFO', JSON.stringify(this.shuttleInfo));
  }

  onClickLoopOption(option) {
    this.formBus.loop = option;
    console.log(option);
  }
}

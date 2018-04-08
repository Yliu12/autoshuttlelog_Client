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


  constructor() {
  }

  ngOnInit() {
    this.formBus.id = this.shuttleInfo.id;
    this.formBus.loop = this.shuttleInfo.loop;
  }

  onClickUpdate() {
    localStorage.setItem('SHUTTLEINFO', JSON.stringify(this.shuttleInfo));
    this.shuttleInfo.id = this.formBus.id;
    this.shuttleInfo.loop = this.formBus.loop;
    this.pageSelected.emit('logEntry');

  }

  onClickLoopOption(option) {
    this.formBus.loop = option;
    console.log(option);
  }
}

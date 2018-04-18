import {Component, Input, OnInit, Output} from '@angular/core';
import {LoopService} from '../../service/loop.service';
import {EventEmitter} from 'selenium-webdriver';

@Component({
  selector: 'app-loop-stop',
  templateUrl: './loop-stop.component.html',
  styleUrls: ['./loop-stop.component.css']
})
export class LoopStopComponent implements OnInit {
  loopValues = [];
  stops = [];
  @Input() formBus;
  @Input() loopDisplay;
  @Input() stopDisplay;


  constructor(private loopService: LoopService) {
  }

  ngOnInit() {
    // this.formBus = this.readBusInfoFromStorage();
    if (this.formBus.loop !== '') {
      this.switchLoopStops(this.formBus.loop);
    }

    this.getLoopData();
  }

  onClickLoopOption(loop) {
    this.stops = loop.stops;
    this.formBus.loop = loop.loopName;
    this.formBus.stop = this.stops.indexOf(this.formBus.stop) < 0 ? this.stops[0] : this.formBus.stop;
  }

  onClickStopOption(stop) {
    this.formBus.stop = stop;
    // console.log(stop);
  }

  getLoopData() {
    this.loopService.getLoopObservable().subscribe(
      (loops) => {
        if (!loops || loops.length === 0) {
          return;
        }
        this.loopValues = loops;

        this.formBus.loop = this.formBus.loop === '' ? loops[0].loopName : this.formBus.loop;
        this.formBus.stop = this.formBus.stop === '' ? this.stops[0] : this.formBus.stop;

        this.switchLoopStops(this.formBus.loop);
      }
    );
  }

  goToNextStop() {
    const currStop = this.formBus.stop;
    const numberofStop = this.stops.indexOf(currStop);
    const nextStopIndex = (numberofStop === this.stops.length - 1 ? 0 : numberofStop + 1).toString();
    this.formBus.stop = this.stops[nextStopIndex];

    // update Shuttle Info
    localStorage.setItem('SHUTTLEINFO', JSON.stringify(this.formBus));

  }

  switchLoopStops(loopName: string) {
    this.loopValues.forEach((loop, index) => {
      if (loop['loopName'] === loopName) {
        this.stops = loop['stops'];
      }
    });


  }

}

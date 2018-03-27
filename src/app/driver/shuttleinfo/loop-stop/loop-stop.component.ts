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
  @Input() shuttleInfo;
  @Input() loopDisplay;
  @Input() stopDisplay;


  constructor(private loopService: LoopService) {
  }

  ngOnInit() {
    this.getLoopData();
  }

  onClickLoopOption(loop) {
    this.stops = loop.stops;
    this.shuttleInfo.loop = loop.loopName;
    this.shuttleInfo.stop = this.stops.indexOf(this.shuttleInfo.stop) < 0 ? this.stops[0] : this.shuttleInfo.stop;
  }

  onClickStopOption(stop) {
    this.shuttleInfo.stop = stop;
    console.log(stop);
  }

  getLoopData() {
    this.loopService.getLoopObservable().subscribe(
      (loops) => {
        if (!loops || loops.length === 0) {
          return;
        }
        this.loopValues = loops;
        this.stops = this.loopValues[0].stops;

        this.shuttleInfo.loop = this.shuttleInfo.loop === '' ? loops[0].loopName : this.shuttleInfo.loop;
        this.shuttleInfo.stop = this.shuttleInfo.stop === '' ? this.stops[0] : this.shuttleInfo.stop;

      }
    );
  }

  goToNextStop() {
    const currStop = this.shuttleInfo.stop;
    const numberofStop = this.stops.indexOf(currStop);
    const nextStopIndex = (numberofStop === this.stops.length - 1 ? this.stops[0] : numberofStop + 1).toString();
    this.shuttleInfo.stop = this.stops[nextStopIndex];

    // update Shuttle Info
    localStorage.setItem('SHUTTLEINFO', JSON.stringify(this.shuttleInfo));

  }

}

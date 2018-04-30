import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {

  dashboarData: {};
  totals: {
    'Green Loop': { boarded: 0, left: 0 },
    'Red Loop': { boarded: 0, left: 0 },
    'Blue Loop': { boarded: 0, left: 0 },
  };
  grandTotal = 0;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getsummary((summary) => {
      console.log(summary);
      this.dashboarData = summary;
      this.totals = summary.total;
      this.grandTotal = this.totals['Green Loop'].boarded + this.totals['Blue Loop'].boarded + this.totals['Red Loop'].boarded;
      this.makeHourlySumamryChart(summary.hour);
    });
  }

  makeHourlySumamryChart(hourlyData) {
    const chartDataG = ['Green Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartDataR = ['Red Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartDataB = ['Blue Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const hourlyDataB = hourlyData['Blue Loop'];
    hourlyDataB.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataB[item.hour - 6] = item.totalNumBoarded;
      }
    });

    const hourlyDataR = hourlyData['Red Loop'];
    hourlyDataR.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataR[item.hour - 6] = item.totalNumBoarded;
      }
    });

    const hourlyDataG = hourlyData['Green Loop'];
    hourlyDataG.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataG[item.hour - 6] = item.totalNumBoarded;
      }
    });

    console.log(chartDataB);
    console.log(chartDataG);
    console.log(chartDataR);
    const hourCate = ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    let chart = c3.generate({
      bindto: '#d1-c1',
      data: {
        columns: [
          chartDataG,
          chartDataB,
          chartDataR
        ], type: 'spline'
      }, axis: {
        x: {
          type: 'category',
          categories: hourCate,
          label: {
            text: 'Hour',
            position: 'outer-right'
          }
        },
      }

    });

  }


}

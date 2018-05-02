import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {DatePipe} from '@angular/common';
import * as c3 from 'c3';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {

  dashboarData: {};
  totals: {
    'Green Loop': { boarded: number, left: number },
    'Red Loop': { boarded: number, left: number },
    'Blue Loop': { boarded: number, left: number },
    'busiestStop': { name: String, total: number }
  };
  grandTotal = 0;
  chart1HourBoarded;
  chart2HourLeft;
  chart3GLStop;
  chart5BLStop;
  chart4RLStop;
  byStopTotal: Object;
  form: { from: number, to: number };

  constructor(private dataService: DataService) {
    this.totals = {
      'Green Loop': {boarded: 0, left: 0},
      'Red Loop': {boarded: 0, left: 0},
      'Blue Loop': {boarded: 0, left: 0},
      'busiestStop': {name: 'No Data Avaliable', total: 0}
    };
    this.byStopTotal = {};

    this.form = {from: 0, to: 0};
  }

  ngOnInit() {

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);


    this.form.to = today.getTime();
    const yesterday = today.setDate(today.getDate() - 1);

    this.form.from = yesterday;

    this.onClickSubmit();
  }


  onClickSubmit() {

    this.dataService.getsummary(this.form, (summary) => {
      this.byStopTotal = {};

      console.log(summary);
      this.dashboarData = summary;
      this.totals = summary.total;
      this.grandTotal = this.totals['Green Loop'].boarded + this.totals['Blue Loop'].boarded + this.totals['Red Loop'].boarded;
      this.makeHourlyBoardedSumamryChart(summary.hour);
      this.makeHourlyLeftSumamryChart(summary.hour);
      this.chart3GLStop = this.makebyStopSumamryChart(summary.stop['Green Loop'], '#d1-c3');
      this.chart4RLStop = this.makebyStopSumamryChart(summary.stop['Red Loop'], '#d1-c4');
      this.chart5BLStop = this.makebyStopSumamryChart(summary.stop['Blue Loop'], '#d1-c5');
      let maxByStopTotal = 0;
      let maxStopName = 'No Data Avaliable';
      for (const key in this.byStopTotal) {
        if (this.byStopTotal[key] > maxByStopTotal) {
          maxByStopTotal = this.byStopTotal[key];
          maxStopName = key;
        }
      }
      this.totals.busiestStop = {name: maxStopName, total: maxByStopTotal};

    });
  }

  makeHourlyBoardedSumamryChart(hourlyData) {
    const chartDataG = ['Green Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartDataR = ['Red Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartDataB = ['Blue Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ChartDataTotal = ['Total', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const hourlyDataB = hourlyData['Blue Loop'];
    hourlyDataB.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataB[item.hour - 6] = item.totalNumBoarded;
        ChartDataTotal[item.hour - 6] += item.totalNumBoarded;
      }
    });

    const hourlyDataR = hourlyData['Red Loop'];
    hourlyDataR.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataR[item.hour - 6] = item.totalNumBoarded;
        ChartDataTotal[item.hour - 6] += item.totalNumBoarded;
      }
    });

    const hourlyDataG = hourlyData['Green Loop'];
    hourlyDataG.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataG[item.hour - 6] = item.totalNumBoarded;
        ChartDataTotal[item.hour - 6] += item.totalNumBoarded;
      }
    });

    console.log(chartDataB);
    console.log(chartDataG);
    console.log(chartDataR);
    const hourCates = ['7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15',
      '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'];
    // const chart1 = c3.generate({
    //   bindto: '#d1-c1',
    //   data: {
    //     columns: [
    //       chartDataG,
    //       chartDataB,
    //       chartDataR,
    //       ChartDataTotal
    //     ], type: 'spline',
    //     colors: {
    //       'Green Loop': '#009900',
    //       'Red Loop': '#BB0000',
    //       'Blue Loop': '#0055FF',
    //       'Total': '#f5871f'
    //     }
    //   }, axis: {
    //     x: {
    //       type: 'category',
    //       categories: hourCates,
    //       label: {
    //         text: 'Hour',
    //         position: 'outer-right'
    //       }
    //     },
    //     y: {
    //       label: {
    //         text: 'No. Boarded',
    //         position: 'outer-middle'
    //       }
    //     }
    //   }
    //
    // });
    const chart = {
      id: '#d1-c1',
      colors: {
        'Green Loop': '#009900',
        'Red Loop': '#BB0000',
        'Blue Loop': '#0055FF',
        'Total': '#f5871f'
      },
      columns: [
        chartDataG,
        chartDataB,
        chartDataR,
        ChartDataTotal
      ],
      type: 'line',
      x: {text: 'Hour'},
      y: {text: 'No. Boarded'},
      categories: hourCates
    };
    this.chart1HourBoarded = this.makeChart(chart);


  }

  makeHourlyLeftSumamryChart(hourlyData) {
    const chartDataG = ['Green Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartDataR = ['Red Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartDataB = ['Blue Loop', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const ChartDataTotal = ['Total', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const hourlyDataB = hourlyData['Blue Loop'];
    hourlyDataB.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataB[item.hour - 6] = item.totalNumLeft;
        ChartDataTotal[item.hour - 6] += item.totalNumLeft;
      }
    });

    const hourlyDataR = hourlyData['Red Loop'];
    hourlyDataR.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataR[item.hour - 6] = item.totalNumLeft;
        ChartDataTotal[item.hour - 6] += item.totalNumLeft;
      }
    });

    const hourlyDataG = hourlyData['Green Loop'];
    hourlyDataG.forEach((item) => {
      if (item.hour - 6 > 0) {
        chartDataG[item.hour - 6] = item.totalNumLeft;
        ChartDataTotal[item.hour - 6] += item.totalNumLeft;
      }
    });

    console.log(chartDataB);
    console.log(chartDataG);
    console.log(chartDataR);
    const hourCates = ['7-8', '8-9', '9-10', '10-11', '11-12', '12-13', '13-14', '14-15',
      '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'];

    const chart = {
      id: '#d1-c2',
      colors: {
        'Green Loop': '#009900',
        'Red Loop': '#BB0000',
        'Blue Loop': '#0055FF',
        'Total': '#f5871f'
      },
      columns: [
        chartDataG,
        chartDataB,
        chartDataR,
        ChartDataTotal
      ],
      type: 'line',
      x: {text: 'Hour'},
      y: {text: 'No. Left at Stops'},
      categories: hourCates
    };
    this.chart2HourLeft = this.makeChart(chart);

    //
    // const chart1 = c3.generate({
    //   bindto: '#d1-c2',
    //   data: {
    //     columns: [
    //       chartDataG,
    //       chartDataB,
    //       chartDataR,
    //       ChartDataTotal
    //     ], type: 'spline',
    //     colors: {
    //       'Green Loop': '#009900',
    //       'Red Loop': '#BB0000',
    //       'Blue Loop': '#0055FF',
    //       'Total': '#f5871f'
    //     }
    //   }, axis: {
    //     x: {
    //       type: 'category',
    //       categories: hourCates,
    //       label: {
    //         text: 'Hour',
    //         position: 'outer-right'
    //       }
    //     },
    //     y: {
    //       label: {
    //         text: 'No. Left at Stops',
    //         position: 'outer-middle'
    //       }
    //     }
    //   }
    // });
  }

  makebyStopSumamryChart(byStopData, target) {
    const loopObj = {};
    byStopData.forEach((item) => {
      loopObj[item.stop] = {'boarded': item.totalNumBoarded, 'left': item.totalNumLeft};
    });
    const cates = [];
    const boardednum = ['boarded'];
    const leftNum = ['Left at Stop'];

    Object.keys(loopObj).forEach((key) => {
      cates.push(key);
      boardednum.push(loopObj[key].boarded);
      leftNum.push(loopObj[key].left);
      if (key in this.byStopTotal) {
        this.byStopTotal[key] += loopObj[key].boarded;
      } else {
        this.byStopTotal[key] = loopObj[key].boarded;
      }
    });

    const chart = {
      id: target,
      colors: {
        'boarded': '#f5871f',
        'Left at Stop': '#F7C6CB'
      },
      columns: [
        boardednum,
        leftNum
      ],
      type: 'bar',
      x: {text: 'Stop'},
      y: {text: 'No. Left at Stops'},
      categories: cates
    };
    return this.makeChart(chart);
  }

  makeChart(chart) {
    return c3.generate({
      bindto: chart.id,
      data: {
        columns: chart.columns, type: chart.type,
        colors: chart.colors
      }, axis: {
        x: {
          type: 'category',
          categories: chart.categories,
          label: {
            text: chart.x.text,
            position: 'outer-right'
          }
        },
        y: {
          label: {
            text: chart.y.text,
            position: 'outer-middle'
          }
        }
      },
      bar: {
        width: {
          ratio: 0.9 // this makes bar width 50% of length between ticks
        }
        // or
        // width: 100 // this makes bar width 100px
      }
    });
  }

  // controller
  parseDate(dateString: string) {
    if (dateString) {
      return (new Date(dateString)).getTime();
    } else {
      return null;
    }
  }
}

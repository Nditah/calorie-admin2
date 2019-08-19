import {Component, OnInit, ViewChild} from '@angular/core';
import {ReceiptsComponent, ReceiptType} from '../components/receipts/receipts.component';
import { Users, Exercises, Foods } from '../providers';
import { User, Exercise, Food } from '../models';
import { isEqual } from '../helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>;

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public userRecords: Array<User>;
  public prevUserRecords: Array<User>;
  public userCount = 0;
  public exerciseRecords: Array<Exercise>;
  public prevExerciseRecords: Array<Exercise>;
  public exerciseCount = 0;
  public foodRecords: Array<Food>;
  public prevFoodRecords: Array<Food>;
  public foodCount = 0;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }
  constructor(private users: Users,
              private exercises: Exercises,
              private foods: Foods) {
                this.userRecords =  this.users.query();
                this.exerciseRecords = this.exercises.query();
                this.foodRecords = this.foods.query();
              }

  ngOnInit() {
    this.chartColor = '#FFFFFF';
    this.canvas = document.getElementById('bigDashboardChart');
    this.ctx = this.canvas.getContext('2d');

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    this.gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.24)');

    this.lineBigDashboardChartData = [
        {
          label: 'Data',

          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,

          borderWidth: 2,
          data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
        }
      ];
      this.lineBigDashboardChartColors = [
       {
         backgroundColor: this.gradientFill,
         borderColor: this.chartColor,
         pointBorderColor: this.chartColor,
         pointBackgroundColor: '#2c2c2c',
         pointHoverBackgroundColor: '#2c2c2c',
         pointHoverBorderColor: this.chartColor,
       }
     ];
    this.lineBigDashboardChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.lineBigDashboardChartOptions = {

          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 0,
                  bottom: 0
              }
          },
          maintainAspectRatio: false,
          tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: 'nearest',
            intersect: 0,
            position: 'nearest'
          },
          legend: {
              position: 'bottom',
              fillStyle: '#FFF',
              display: false
          },
          scales: {
              yAxes: [{
                  ticks: {
                      fontColor: 'rgba(255,255,255,0.4)',
                      fontStyle: 'bold',
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      padding: 10
                  },
                  gridLines: {
                      drawTicks: true,
                      drawBorder: false,
                      display: true,
                      color: 'rgba(255,255,255,0.1)',
                      zeroLineColor: 'transparent'
                  }

              }],
              xAxes: [{
                  gridLines: {
                      zeroLineColor: 'transparent',
                      display: false,

                  },
                  ticks: {
                      padding: 10,
                      fontColor: 'rgba(255,255,255,0.4)',
                      fontStyle: 'bold'
                  }
              }]
          }
    };

    this.lineBigDashboardChartType = 'line';


    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: 'transparent',
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: 'transparent',
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };




    this.canvas = document.getElementById('barChartSimpleGradientsNumbers');
    this.ctx = this.canvas.getContext('2d');

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    this.gradientFill.addColorStop(1, this.hexToRGB('#2CA8FF', 0.6));

  }

  ngDoCheck() {
    if (!isEqual(this.userRecords, this.prevUserRecords)) {
      this.prevUserRecords = [...this.userRecords];
      this.userCount = this.userRecords.length;
    }

    if (!isEqual(this.exerciseRecords, this.prevExerciseRecords)) {
      this.prevExerciseRecords = [...this.exerciseRecords];
      this.exerciseCount = this.exerciseRecords.length;
    }

    if (!isEqual(this.foodRecords, this.prevFoodRecords)) {
      this.prevFoodRecords = [...this.foodRecords];
      this.foodCount = this.foodRecords.length;
    }
  }
}

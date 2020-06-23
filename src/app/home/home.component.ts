import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import chartdata from '@app/chartData';
import { User } from '@app/models';
import { UserService, ChartService } from '@app/services';

declare var Highcharts: any;


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading:boolean = false;
    users: User[];
    data: any[];

    constructor(private userService: UserService, private chartService: ChartService) { }

    randomParam() : number {
        // Generate random values as params
        return 100;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.chartService.getAll().subscribe(data => {
            // create the chart
            let charts = new Highcharts.stockChart({
                chart: {
                    renderTo: 'container',
                    alignTicks: false
                },
                title: {
                    text: 'AAPL stock price by minute'
                },
        
                rangeSelector: {
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1D'
                    }, {
                        type: 'all',
                        count: 1,
                        text: 'All'
                    }],
                    selected: 1,
                    inputEnabled: false
                },

                yAxis: [{
                    title: {
                        text: 'OHLC'
                    },
                    lineWidth: 2
                }],

                // tooltip: {
                //     formatter: function() {
                //         console.log(this.points[0])
                //         return '<div><b>Open : </b><span>'+this.points[0].point.open+'</span></div><div><b>Close : </b><span>'+this.points[0].point.close+'</span></div><div><b>High : </b><span>'+this.points[0].point.high+'</span></div><div><b>Low : </b><span>'+this.points[0].point.low +'</span></div><div><b>Turnover : </b><span>  199</span></div>';
                //     },
                //     valueDecimals: 2,
                //     useHTML: true
                // },
        
                series: [{
                    name: 'AAPL',
                    type: 'candlestick',
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            });
        })
    }
}
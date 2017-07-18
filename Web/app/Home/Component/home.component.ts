import {Component , Input, OnInit, ViewChild} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import { httpService } from "./../../Core/Services/http.service";
import 'rxjs/add/operator/toPromise';
import * as moment from "moment";

@Component({
    selector: 'ticket-home',
    templateUrl:'./../Views/home.component.html',
    styleUrls:['./../Styles/main.css']
})
export class homeComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart:any;
  fromDate:Date;
  toDate:Date;
  dateRange:any;
  dateRangeList: any = [];
  componentFxFlex:string = '';
  componentFxFlexLayout:string = 'row';
  chartData: any = null;
  legendData: any = [];
  displaySellLegend: any = null;
  displayBuyLegend: any = null;

  lineChartData:Array<any> = [];
  lineChartLabels:Array<any> = [];

  pieChartLabels:string[] = [];
  pieChartData:number[] = [];
  pieChartType:string = 'doughnut';

  barChartData:Array<any> = [];
  barChartLabels:Array<any> = [];
  barChartType:String="pie";
  selectedCity:string = "chennai";
  cityList:Array<String> = ["chennai"]; 

  barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  tableData:Array<any> = [];

  constructor(private http : httpService){
    this.fromDate = new Date();
    this.toDate = moment(this.fromDate).add(5,'days').toDate();
    this.dateRange = moment(this.toDate).diff(this.fromDate,'days');
    this.dateRangeList.push(this.fromDate);
    for(var i=1; i <= this.dateRange; i++){
      this.dateRangeList.push(moment(this.fromDate).add(i,"days").toDate());
    }
  }

  loadAllCharts(){
      this.http.getDataForCharts({
          fromDate:{type:"date",value:this.fromDate},
          toDate: {type:"date",value:this.toDate},
          city: {type:"string",value:this.selectedCity}
        })
        .then((result: any)=>{
           if(result.status == 200){
                console.log(result._body);
                this.chartData = JSON.parse(result._body);
                this.legendData = this.chartData.filter((value:any) => value.type == "legend").map((value:any) => value.result && value.result[0]);
                this.displaySellLegend = this.legendData[this.legendData.findIndex((value:any) => value && value.type == "sell")]
                this.displayBuyLegend = this.legendData[this.legendData.findIndex((value:any) => value && value.type == "buy")];
                this.cityList = this.chartData.filter((value:any) => value.type == "city")[0].result;
                
                console.log(this.chartData.filter((value:any) => value.type == 'graph').map((value:any) => value.result).length > 0);
                if(this.chartData.filter((value:any) => value.type == 'graph').map((value:any) => value.result).length > 0){
                    this.updateChart();
                }
           }
           else{
               this.chartData = null;
           }
        },
        (result)=>{
            this.chartData = null;
        });
  }

   ngOnInit(){
        this.loadAllCharts();
    }

    graphData:any;
    trendChart: any;
    movieList: any;

    updateChart(){
        this.graphData = this.chartData.filter((value:any) => value.type == 'graph').map((value:any) => value.result)[0]; 
        var self = this;

        this.movieList = this.graphData.filter((value: any, index: any) => index == self.graphData.findIndex((indexvalue:any) => indexvalue.movie == value.movie)).map((value: any) => value.movie);
        
          self.lineChartData = self.movieList.map((movieValue:any, movieIndex: any)=>{
           var dataList = self.graphData.filter((chartValue :any) => chartValue.movie == movieValue),
           data = self.dateRangeList.map((dateValue:Date)=>{
              var trendCalc = dataList.filter(function(stepValue: any){
                  var havingDate = moment(dateValue).startOf('day'), stepDate = moment(new Date(stepValue.date.year+'-'+(stepValue.date.month)+'-'+stepValue.date.day)).startOf('day');
                  return havingDate.date() == stepDate.date() && havingDate.month() == stepDate.month() && havingDate.year() == stepDate.year();
              });
              var count = 0;
              switch(trendCalc.length){
                 case 2:
                      if(trendCalc[0].type == "buy"){
                          count = trendCalc[0].count - trendCalc[1].count;
                      }
                      else{
                          count = trendCalc[1].count - trendCalc[0].count;
                      }
                      break;
                 case 1:
                      if(trendCalc[0].type == "buy"){
                          count = trendCalc[0].count;
                      }
                      else{
                          count = - trendCalc[0].count;
                      }
                      break;
              }
              return count;
           });
          //  .map((filterValue:any) => filterValue ? filterValue : 0);
           return {data: data, label:movieValue}
        });

        
        this.lineChartLabels = this.dateRangeList.map((dateValue:Date) => moment(dateValue).format("DD/MM/YYYY"));
        setTimeout(() => {
            if (self.chart && self.chart.chart && self.chart.chart.config) {
                // self.chart.chart.config.data.labels = self.lineChartLabels;
                // self.chart.chart.config.data.datasets = self.lineChartData;
                self.chart.chart.update();
            }
        },500);
        this.pieChartData = this.movieList.map((movieName:any) => {
            var count = 0;
            self.graphData.filter((graphValue:any) => graphValue.movie == movieName)
            .forEach((element:any) => {
                if(element.type == "buy"){
                  count += element.count;
                }
                else{
                  count -= element.count;
                }
            });
            return count;
        }).map((value :any) => value > 0 ? value : 0);
        this.pieChartLabels = this.movieList;

        this.barChartData = this.pieChartData.filter((value:any) => value > 0);
        this.barChartLabels = this.movieList.filter((value:any,index:any) => self.pieChartData[index] > 0);

        this.tableData = this.movieList.map((movieName: String):any => {
            var dataList = self.graphData.filter((chartValue :any) => chartValue.movie == movieName);
            return {
                  movie : movieName,
                   data: self.dateRangeList.map((dateValue: Date) => {
                        var trendCalc = dataList.filter(function(stepValue: any){
                            var havingDate = moment(dateValue).startOf('day'), stepDate = moment(new Date(stepValue.date.year+'/'+stepValue.date.month+'/'+stepValue.date.day)).startOf('day');
                            return havingDate.date() == stepDate.date() && havingDate.month() == stepDate.month() && havingDate.year() == stepDate.year();
                          }).map((value:any) => {
                            value.minDate = moment(value.minDate).format("DD/MM/YYYY");
                            return value;
                          });
                          return trendCalc;
                    })
                  }
        }).map((value:any) => {
          var data:Array<any> = [];
          value.data.forEach((dateWiseRecords:Array<any>) => {
              data = data.concat(dateWiseRecords);
          });
          return {
            movie:value.movie,
            data:data
          };
        });    
        if(this.chart){
          this.chart.ngOnChanges({});
        }
        
  };
  

  dateChanged(){
    if(moment(this.toDate).isAfter(this.fromDate)){
        this.displaySellLegend = null;
        this.displayBuyLegend = null;
        this.dateRange = moment(this.toDate).diff(this.fromDate,'days');
        this.dateRangeList = [];
        this.dateRangeList.push(this.fromDate);
        for(var i=1; i <= this.dateRange; i++){
          this.dateRangeList.push(moment(this.fromDate).add(i,"days").toDate());
        }
        this.chartData = null;
        this.lineChartData = [];
        this.lineChartLabels = [];
        this.pieChartData = [];
        this.pieChartLabels = [];
        this.barChartData = [];
        this.barChartLabels = [];
        this.tableData = [];
        this.loadAllCharts();
    }
  };

  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


}
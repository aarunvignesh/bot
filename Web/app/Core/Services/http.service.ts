import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import * as moment from "moment";

@Injectable()
export class httpService{
    constructor(private http: Http){

    }

    getDataForCharts(query:Object){
       var queryString:String = "";
       for(var key in query){
           queryString += key +"="+moment(query[key]).format("YYYY-MM-DD")+"&";
       } 
       return this.http
                .get('/data/all'+(queryString ? ("?"+queryString):""))
                .toPromise();
    }
}
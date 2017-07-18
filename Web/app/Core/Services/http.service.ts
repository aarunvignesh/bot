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
           if(query[key].type == "date"){
                queryString += key +"="+moment(query[key].value).format("YYYY-MM-DD")+"&";
           }
           else{
               queryString += key +"="+(query[key].value)+"&";
           }
       } 
       return this.http
                .get('/data/all'+(queryString ? ("?"+queryString):""))
                .toPromise();
    }
}
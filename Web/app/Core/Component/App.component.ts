import {Component} from "@angular/core";

@Component({
    selector: 'ticket-app',
    templateUrl: './../Views/app.component.html'
})
export class AppComponent{
    fromDate:Date;
    toDate:Date;

    constructor(){
       
    };

}
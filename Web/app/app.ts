import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'
import { ChartsModule } from 'ng2-charts';


import { homeComponent } from "./Home/Component/home.component";
import { AppComponent } from "./Core/Component/App.component";
import { loginComponent } from "./Login/Component/login.component";
import { httpService } from "./Core/Services/http.service";
import { loginService } from "./Login/Service/login.service";

const Route: Routes = [
    {
        path:'home',
        component: homeComponent,
        canActivate:[loginService]
    },
    {
        path:'login',
        component: loginComponent,
        canActivate:[loginService]
    },
    {
        path:'',
        redirectTo:'/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:[
       BrowserModule,
       BrowserAnimationsModule,
       MaterialModule,
       FlexLayoutModule,
       ChartsModule,
       HttpModule,
       MdNativeDateModule,
       FormsModule,
       RouterModule.forRoot(Route)
    ],
    declarations:[
        homeComponent,
        loginComponent,
        AppComponent
    ],
    providers:[
        httpService,
        loginService
    ],
    bootstrap:[
        AppComponent
    ]
})
export class AppModule{

}
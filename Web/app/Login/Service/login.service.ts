
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class loginService implements CanActivate {

    isAuthenticated: Boolean;

    constructor(private http: Http, private router: Router) {
        this.isAuthenticated = (<any>window).isAuthenticated;
    };

    

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.isAuthenticated){
            if(state.url == "/home"){
                return true;
            }
            else{
                this.router.navigate(['home']);
            }
        }
        else{
             if(state.url == "/login"){
                return true;
            }
            else{
                this.router.navigate(['login']);
            }
        }

    };

    
}
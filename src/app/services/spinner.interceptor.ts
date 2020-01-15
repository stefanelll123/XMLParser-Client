import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(public spinner: NgxSpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(request).pipe(tap(data => {
            this.spinner.hide();
            console.log(data);
            return data;
        }),catchError(err => {
            // this.spinner.hide();
            return throwError(err);
        }));
    }
}
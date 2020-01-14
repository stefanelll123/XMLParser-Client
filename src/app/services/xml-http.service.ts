import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class XMLHttpService {
  constructor(public http: HttpClient) { }

  getDocumentByTag(tagName): Observable<any> {
    return this.http.get<any>(environment.url + '/tags', 
      {params: {tag_name: tagName}})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getDocumentByDepth(depth): Observable<any> {
    return this.http.get<any>(environment.url + '/depths', 
      {params: {depth: depth}})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getDocumentByTagSize(size, word): Observable<any> {
    return this.http.get<any>(environment.url + '/elements', 
      {params: {size: size, word: word}})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getDocumentWithWordBelowTag(size): Observable<any> {
    return this.http.get<any>(environment.url + '/search', 
      {params: {tag_name: size}})
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  uploadXML(file : File): Observable<any> {
    return this.http.post<any>(environment.url + '/upload_file', JSON.stringify(file))
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error) {
    let errorMessage = 'An error has occured!';
    // if(error.error instanceof ErrorEvent) {
    //   errorMessage = error.error.message;
    // } else if(error.error instanceof HttpErrorResponse) {
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}

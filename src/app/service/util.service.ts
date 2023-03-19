import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { concat, delay, Observable, of, retry, retryWhen, scan, switchMap, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http:HttpClient) { 

  }
/*
  post(url:string):Observable<string>{
    return this.http.post<string>(url, payload).pipe(
      retryWhen(errors => errors.pipe(
        switchMap((error) => {
          if (error.status === 504 || error.status === 503) {
            return of(error.status);
          }
          return _throw({message: error.error.message || 'Notification.Core.loginError'});
        }),
        scan(acc => acc + 1, 0),
        takeWhile(acc => acc < 3),
        delay(1000),
        concat(_throw({message: 'Notification.Core.networkError'}))
      ))
    );
  }*/
}

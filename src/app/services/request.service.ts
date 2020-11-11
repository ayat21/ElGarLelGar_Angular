import { Injectable } from '@angular/core';
import {Request} from 'src/app/Models/request'
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  
 public RequestBehaviorSubject=new BehaviorSubject<Request[]>([]);

  constructor(private httpClient: HttpClient) { 
    this.get();
  }
  
  public get() {
    this.httpClient.get<Request[]>('https://localhost:44383/api/Request/GetRequests')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.RequestBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(RequestToAdd: Request) {
    return this.httpClient.post<Request[]>('https://localhost:44383/api/Request',
     RequestToAdd)
      .subscribe(response => {
        this.RequestBehaviorSubject.next(this.RequestBehaviorSubject.getValue().concat(response));
      });
  }


  public remove(RequestToDelete: number) {
    this.httpClient.delete('https://localhost:44383/api/Request' + '/' + RequestToDelete).subscribe(() => {
      let newRequestList = this.RequestBehaviorSubject.getValue().
      filter(Request => Request.ID !== RequestToDelete);
      this.RequestBehaviorSubject.next(newRequestList);
    })
  }

}

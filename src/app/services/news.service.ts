import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { News } from '../Models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  
  public NewsBehaviorSubject=new BehaviorSubject<News[]>([]);

  constructor(private httpClient: HttpClient) { 
    this.get();
  }
  
  public get() {
    this.httpClient.get<News[]>('https://localhost:44383/api/NewsItem/GetNewss')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.NewsBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(NewstToAdd: News) {
    return this.httpClient.post<News[]>('https://localhost:44383/api/NewsItem',
    NewstToAdd)
      .subscribe(response => {
        
        this.NewsBehaviorSubject.next(this.NewsBehaviorSubject.getValue().
        concat(response));
      });
  }


  public remove(NewsToDelete: number) {
    this.httpClient.delete('https://localhost:44383/api/NewsItem' + '/' + NewsToDelete).subscribe(() => {
      let newNewstList = this.NewsBehaviorSubject.getValue().
      filter(News => News.ID !== NewsToDelete);
      this.NewsBehaviorSubject.next(newNewstList);
    })
  }
}

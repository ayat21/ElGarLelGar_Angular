import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { User } from '../Models/user';
import {Neighbours}  from '../Models/neighbours'
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { City } from '../Models/City';
import { Area } from '../Models/area';
import { Street } from '../Models/street';

@Injectable({
  providedIn: 'root'
})
export class AdduserserviceService {

  public UserBehaviorSubject = new BehaviorSubject<User[]>([]);
  public NeighboursBehaviorSubject = new BehaviorSubject<Neighbours[]>([]);
 

  constructor(private httpClient: HttpClient) { 
    this.GetNeighbours();
    this.get();
  }

  CityDDL(): Observable<City[]>
  {
    return this.httpClient.get<City[]>( 'https://localhost:44383/api/ApplicationUser/CityData');
  }
  AreaDDL(CityId: number): Observable<Area[]>
  {
    return this.httpClient.get<Area[]>( 'https://localhost:44383/api/ApplicationUser/AreaData?CityId='+CityId);
  }
  StreetDDL(AreaId: number): Observable<Street[]>
  {
    return this.httpClient.get<Street[]>('https://localhost:44383/api/ApplicationUser/StreetData?AreaId='+AreaId);
  }

  public  GetNeighbours()
  {
    
      this.httpClient.get<Neighbours[]>('https://localhost:44383/api/ApplicationUser/GetNeighbours')
        .pipe(
          catchError(error => {
            console.log('Error caught', error);
            return throwError(error);
          })
        )
        .subscribe(
          success => {
            console.log('Success case called');
            this.NeighboursBehaviorSubject.next(success)
          },
          error => console.log('Error in subscribe', error),
          () => console.log('Subscribe complete')
        );
  }
  public get() {
    this.httpClient.get<User[]>('https://localhost:44383/api/ApplicationUser/GetUsers')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.UserBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(UserToAdd: User) {
    return this.httpClient.post<User[]>('https://localhost:44383/api/ApplicationUser/addUser', UserToAdd)
      .subscribe(response => {
        this.UserBehaviorSubject.next(this.UserBehaviorSubject.getValue().concat(response));
      });
  }

  public update(updatedUser: User) {
    return this.httpClient.put<User>('https://localhost:44383/api/ApplicationUser' + 
    '/' + updatedUser.ID, 
    updatedUser).subscribe( response => {
        let currentData = this.UserBehaviorSubject.getValue();
        const index = currentData.findIndex(User => User.ID == updatedUser.ID);
        currentData[index] = updatedUser;
        this.UserBehaviorSubject.next(currentData);
    },
    (error) => {
      console.log("Error", error);
    }
    )
  }

  public remove(UserToDelete: number) {
    this.httpClient.delete('https://localhost:44383/api/ApplicationUser' + '/' + UserToDelete).subscribe(() => {
      let newUserList = this.UserBehaviorSubject.getValue().filter(User => User.ID !== UserToDelete);
      this.UserBehaviorSubject.next(newUserList);
    })
  }

  
}

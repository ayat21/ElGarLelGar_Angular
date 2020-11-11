
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../Models/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { City } from '../Models/City';
import { Area } from '../Models/area';
import { Street } from '../Models/street';

@Injectable({ providedIn: 'root' })
export class LayoutService {

    
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>
        (JSON.parse(localStorage.getItem('currentUser')));
        console.log(localStorage.getItem('currentUser'));
      
        this.currentUser = this.currentUserSubject.asObservable();
        console.log(this.currentUser);
    }
    public get currentUserValue(): User {
        
        console.log(this.currentUserSubject.value);

        return this.currentUserSubject.value;

    }
    apiUrl: 'https://localhost:44383/api';

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/ApplicationUser/authenticate`,
         { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.Token) {
                    console.log("hhh",user.Token);

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                }

                return user;
            }));
    }
    
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/ApplicationUser/`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/ApplicationUser/${id}`);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    getuserById(id:number){
        return this.http.get(`${this.apiUrl}/${id}`)
      }
  editUser(user)
{
  return this.http.put(`https://localhost:44396/api/ApplicationUser/register`, user);
}
saveUser(user) {  
    return this.http.post(`https://localhost:44396/api/ApplicationUser/register`, user);  
}
}

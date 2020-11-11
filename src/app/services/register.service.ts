import { Injectable } from '@angular/core';
import { City } from '../Models/City';
import { User } from '../Models/user';
import { Area } from '../Models/area';
import { Street } from '../Models/street';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  formData: User;
  apiUrl: 'https://localhost:44383/api';
  user: User[];
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  CityDDL(): Observable<City[]>
  {
    return this.http.get<City[]>( 'https://localhost:44383/api/ApplicationUser/CityData');
  }
  AreaDDL(CityId: number): Observable<Area[]>
  {
    return this.http.get<Area[]>( 'https://localhost:44383/api/ApplicationUser/AreaData?CityId='+CityId);
  }
  StreetDDL(AreaId: number): Observable<Street[]>
  {
    return this.http.get<Street[]>('https://localhost:44383/api/ApplicationUser/StreetData?AreaId='+AreaId);
  }
 
    
  //   getAll() {
  //     return this.http.get<User[]>(`${config.apiUrl}/users`);
  // }

register(user : User) {
      return this.http.post(`https://localhost:44383/api/ApplicationUser/register`, user);
  }

  // delete(id: number) {
  //     return this.http.delete(`${config.apiUrl}/users/${id}`);
  // }
   

}

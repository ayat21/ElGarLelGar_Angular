import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { AssetService } from 'src/app/services/asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Asset } from 'src/app/Models/asset';
import {Skill } from 'src/app/Models/skill';
import { City } from 'src/app/Models/city';
import { Area } from 'src/app/Models/area';
import { Street } from 'src/app/Models/street';
import { Role } from 'src/app/Models/role';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Id: number; 
  errorMessage: any;  
  formModel: FormGroup;
  apiUrl: 'https://localhost:44396/api';
  list: User[];
  public assetList: Asset[];
  
  constructor(private router: Router ,private http: HttpClient, 
    private fb: FormBuilder,  public layoutService:LayoutService, private assetservice:AssetService) { 
      this.currentUser = this.layoutService.currentUserValue;  
      
      this.formModel = this.fb.group({
        Name: [''],
        Email: [''],
        phone: [''],
        City: [''],
        Area: [''],
        Street: [''],
        Password: [''],
        ConfirmPassword: ['']
    })}
   


  ngOnInit() {
   
    
    if (this.Id > 0) {  
      this.layoutService.getuserById(this.Id)  
          .subscribe(resp => this.formModel.setValue(resp)  
          , error => this.errorMessage = error);  
  }  

}
save() {  
  
  if (!this.formModel.valid) {  
      return;  
  }  

  
      this.layoutService. editUser(this.formModel.value)  
          .subscribe((data) => {  
              this.router.navigate(['']);  
          }, error => this.errorMessage = error)  
  }  
  currentUser: User;
  userFromApi: User;

cancel() {  
  this.router.navigate(['/fetch-employee']);  
}  
public createPhoto = (serverPath: string) => {
  return `https://localhost:44383/${serverPath}`;
}



get isAdmin() {
  return this.currentUser && this.currentUser.Role === Role.Admin;
}

logout() {
  this.layoutService.logout();
  this.router.navigate(['/layout']);
}
}


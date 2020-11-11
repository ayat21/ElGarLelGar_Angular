import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { Role } from 'src/app/Models/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetService} from 'src/app/services/asset.service';
import { first } from 'rxjs/operators';
import { Asset } from 'src/app/Models/asset';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import {AssetUsers} from 'src/app/Models/assetUsers';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [DatePipe]
})
export class IndexComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  dataSaved = false;  
  assetForm:FormGroup;  
  allAssets: Observable<Asset[]>;  
  assetIdUpdate = null;  
  massage = null;  
  error: string;
  uploadError: string;
  
  
  submitted=false;
  test: string;
  myDate = new Date();
  imagePath: string;
 
  /**
   *  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: LayoutService
  ) {
     
  }

  
   */
  public AssetList$: Observable<AssetUsers[]>;
  constructor(
    private datePipe: DatePipe,
    public myservice:AssetService,
      private router: Router,
      private authenticationService: LayoutService,
      private layoutservice:LayoutService,     
    private route: ActivatedRoute,
    private newsService:NewsService,
    private assetService:AssetService
  ) {
    this.AssetList$ = this.assetService.UsersAssetsBehaviorSubject.asObservable();
    console.log(this.AssetList$);
    this.currentUser = this.authenticationService.currentUserValue;  
    console.log( this.currentUser)
  }
 

  ngOnInit() {
    this.assetService.GetUsersAssets();
    
  }
  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }

  
 
  get isAdmin() {
    return this.currentUser && this.currentUser.Role === Role.Admin;
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/layout']);
}
}

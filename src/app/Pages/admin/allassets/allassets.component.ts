import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { AssetUsers } from 'src/app/Models/assetUsers';
import { Observable } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { FormGroup } from '@angular/forms';
import { Asset } from 'src/app/Models/asset';
import { User } from 'src/app/Models/user';
import { Role } from 'src/app/Models/role';

@Component({
  selector: 'app-allassets',
  templateUrl: './allassets.component.html',
  styleUrls: ['./allassets.component.css']
})
export class AllassetsComponent implements OnInit {

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
  public AssetList$: Observable<Asset[]>;
  constructor( 
    public myservice:AssetService,
      private router: Router,
      private authenticationService: LayoutService,
      private layoutservice:LayoutService,     
    private route: ActivatedRoute,
    private newsService:NewsService,
    private assetService:AssetService
  ) {
    this.AssetList$ = this.assetService.AssetBehaviorSubject.asObservable();
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

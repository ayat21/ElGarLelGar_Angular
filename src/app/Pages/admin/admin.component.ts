import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { Observable } from 'rxjs';
import { AssetService } from 'src/app/services/asset.service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'src/app/services/layout.service';
import { AdduserserviceService } from 'src/app/services/adduserservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/Models/role';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public response: {'dbPath': ''}; 
  public currentUser: User;
  public userFromApi: User;
  public newAssetID:number;
  public UserNAme:String;
  public isCreate: boolean;
  imgPath:string;  
  public userlist$: Observable<User[]>;
  constructor(private assetService: AssetService,
    private authentication:LayoutService,private http: HttpClient,
    private adduserService:AdduserserviceService,
    private router: Router,
         
    private route: ActivatedRoute,) {
    this.currentUser = authentication.currentUserValue;
    this.newAssetID= this.currentUser.ID;
    this.UserNAme=this.currentUser.Name;
    this.userlist$ = this.adduserService.UserBehaviorSubject.asObservable();
    this.imgPath=this.currentUser.Photo;
  //  this.passedPhotoPath=this.response.dbPath;
  //  this.newNews.Photo:this.passedPhotoPath;

   }
   
 
   error: {};
  ngOnInit() {
    this.adduserService.get();
    

  } 
  public uploadFinished = (event) => {
    this.response = event;
  }
 
  

  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }
  
 
  get isAdmin() {
    return this.currentUser && this.currentUser.Role === Role.Admin;
}

logout() {
    this.authentication.logout();
    this.router.navigate(['/layout']);
}

}

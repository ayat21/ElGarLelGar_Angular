import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import {Asset} from 'src/app/Models/asset'
import { Observable } from 'rxjs';
import { AssetService } from 'src/app/services/asset.service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'src/app/services/layout.service';
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  public response: {'dbPath': ''}; 
  public currentUser: User;
  public userFromApi: User;
  public newAssetID:number;
  public UserNAme:String;
  public isCreate: boolean;
  imgPath:string; 
  public newAsset: Asset = new Asset();
  public AssetList$: Observable<Asset[]>;
  constructor(private assetService: AssetService,
    authentication:LayoutService,private http: HttpClient) {
    this.currentUser = authentication.currentUserValue;
    this.newAssetID= this.currentUser.ID;
    this.UserNAme=this.currentUser.Name;
    this.newAsset.UserId=this.newAssetID;
    this.AssetList$ = this.assetService.AssetBehaviorSubject.asObservable();
    this.imgPath=this.currentUser.Photo;
  //  this.passedPhotoPath=this.response.dbPath;
  //  this.newNews.Photo:this.passedPhotoPath;

   }
   
 
   error: {};
  ngOnInit() {
    this.assetService.get();
    

  }
  id=this.newAsset.UserId;
//   NameOfNewsOwner(id) {
//     const Nameof = this.newsService.getById(User => this.userFromApi.ID === id)
//  }
addAsset() {
    this.newAsset = {
      Name: this.newAsset.Name,
      ID: this.newAsset.ID,
      Photo: this.response.dbPath,
      Date:this.newAsset.Date,
      UserId:this.newAsset.UserId,
      Description:this.newAsset.Description,
      Price:this.newAsset.Price
    }
      this.assetService.add(this.newAsset);

  }
  deleteAsset(AssetIdToDelete: number) {
    console.log(AssetIdToDelete);
    this.assetService.remove(AssetIdToDelete);
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
 
  

  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }


}

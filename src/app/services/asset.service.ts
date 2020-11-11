
import { Injectable } from '@angular/core';
import { Asset } from 'src/app/Models/asset';
import { AssetUsers } from 'src/app/Models/assetUsers'; 
import { constructor } from 'jquery';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class AssetService {
    
  public AssetBehaviorSubject=new BehaviorSubject<Asset[]>([]);
  public UsersAssetsBehaviorSubject=new BehaviorSubject<AssetUsers[]>([]); 
public sucseede:AssetUsers[];
  constructor(private httpClient: HttpClient) { 
    this.GetUsersAssets();
  }
  public GetUsersAssets()
  {
    this.httpClient.get<AssetUsers[]>('https://localhost:44383/api/Asset/GetUsersAssets')
    .pipe(
      catchError(error => {
        console.log('Error caught', error);
        return throwError(error);
      })
    )
    .subscribe(
      success => {
        console.log('Success case called');
        this.UsersAssetsBehaviorSubject.next(success)
      },
      error => console.log('Error in subscribe', error),
      () => console.log('Subscribe complete')
    );
  }
  public get() {
    this.httpClient.get<Asset[]>('https://localhost:44383/api/Asset/GetAssets')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.AssetBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(AssettToAdd: Asset) {
    return this.httpClient.post<Asset[]>('https://localhost:44383/api/Asset/addAsset',
    AssettToAdd)
      .subscribe(response => {
        
        this.AssetBehaviorSubject.next(this.AssetBehaviorSubject.getValue().
        concat(response));
      });
   
}
public update(updatedAsset: Asset) {
  return this.httpClient.put<Asset>('https://localhost:44383/api/Asset' + '/' + updatedAsset.ID, 
    updatedAsset).subscribe( response => {
      let currentData = this.AssetBehaviorSubject.getValue();
      const index = currentData.findIndex(Asset => Asset.ID == updatedAsset.ID);
      currentData[index] = updatedAsset;
      this.AssetBehaviorSubject.next(currentData);
  },
  (error) => {
    console.log("Error", error);
  }
  )
}

public remove(AssetIdToDelete: number) {
  this.httpClient.delete('https://localhost:44383/api/Asset' + '/' + AssetIdToDelete).subscribe(() => {
    let newAssetList = this.AssetBehaviorSubject.getValue().filter(Asset => Asset.ID!== AssetIdToDelete);
    this.AssetBehaviorSubject.next(newAssetList);
  })
}
}
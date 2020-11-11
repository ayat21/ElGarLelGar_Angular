import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AdduserserviceService } from 'src/app/services/adduserservice.service';
import { Observable } from 'rxjs';
import { Area } from 'src/app/Models/area';
import { City } from 'src/app/Models/City';
import { Street } from 'src/app/Models/street';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  
  private _allCity: Observable<City[]>;
  private _allArea: Observable<Area[]>;
  private _allStreet: Observable<Street[]>;
  SelCityId:number;
  SelAreaId:number; 
  public response: {'dbPath': ''};
  public newUser: User = new User();
  public newCity: City = new City();
  public newArea: Area = new Area();
  selectedFile: File
  FillCityDDL()
  {
   
    this._allCity=this.addUserService.CityDDL();
    
  }
  FillAreaDDL()
  {
    //debugger;
    this._allArea=this.addUserService.AreaDDL(this.SelCityId);
    console.log(this._allArea)
  }
  FillStreetDDL()
  {
    //debugger;
    this._allStreet=this.addUserService.StreetDDL(this.SelAreaId);
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  } 
 
 
  constructor(private addUserService: AdduserserviceService,private formBuilder: FormBuilder) { 
  this.SelCityId=this.newCity.ID;
  this.SelAreaId=  this.newArea.ID;
  
  }

  ngOnInit():void {
    this.FillCityDDL(); 
    
         
  }

 
    

  addOrUpdateUser() {
    
    this.newUser ={
      Name: this.newUser.Name,
      ID: this.newUser.ID,
      Photo: this.response.dbPath,
      About:this.newUser.About,
      Gender:this.newUser.Gender,
      Password:this.newUser.Password,
      Phone:this.newUser.Phone,
      Email:this.newUser.Email,
      Role:this.newUser.Role,
      streetID:this.newUser.streetID
    }
    if(this.newUser.ID) {
      this.addUserService.update(this.newUser);
    } else {
      alert('form fields are validated successfully!');
      this.addUserService.add(this.newUser);
    }
  }
  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }

  public uploadFinished = (event) => {
    this.response = event;
  }
}

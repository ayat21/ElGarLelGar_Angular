import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{Request} from 'src/app/Models/request'
  import { from, Observable } from 'rxjs';
import { User } from 'src/app/Models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { HttpClient } from '@angular/common/http';
import { RequestService } from 'src/app/services/request.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  currentUser: User;
  userFromApi: User;
  newRequestID:number;
  UserNAme:String;
  
  public response: {'dbPath': ''}; 
  imgPath:string; 
  public newRequest: Request = new Request();
  public RequestList$: Observable<Request[]>;
  constructor(private requestService: RequestService,
    authentication:LayoutService) {
    this.currentUser = authentication.currentUserValue;
    this.newRequestID= this.currentUser.ID;
    this.UserNAme=this.currentUser.Name;
    this.newRequest.UserID=this.newRequestID;
    this.RequestList$ = this.requestService.RequestBehaviorSubject.asObservable();
     
    this.imgPath=this.currentUser.Photo;
   }
   requests: Request;
   error: {};
  ngOnInit() {
    this.requestService.get();
       

  }
  public createImgPath = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }
  addRequest() {
     
      this.requestService.add(this.newRequest);
  }

}

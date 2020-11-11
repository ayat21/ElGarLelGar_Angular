import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/Models/user';
import { News } from 'src/app/Models/news';
import { Observable } from 'rxjs';
import { NewsService } from 'src/app/services/news.service';
import { LayoutService } from 'src/app/services/layout.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public response: {'dbPath': ''}; 
  public currentUser: User;
  public userFromApi: User;
  public newNewstID:number;
  public UserNAme:String;
  

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  imgPath:string; 
  public newNews: News = new News();
  public NewsList$: Observable<News[]>;
  constructor(private newsService: NewsService,
    authentication:LayoutService,private http: HttpClient) {
    this.currentUser = authentication.currentUserValue;
    this.newNewstID= this.currentUser.ID;
    this.UserNAme=this.currentUser.Name;
    this.newNews.UserId=this.newNewstID;
    this.NewsList$ = this.newsService.NewsBehaviorSubject.asObservable();
    this.imgPath=this.currentUser.Photo;
  //  this.passedPhotoPath=this.response.dbPath;
  //  this.newNews.Photo:this.passedPhotoPath;

   }
   
 
   error: {};
  ngOnInit() {
    this.newsService.get();
    

  }
  id=this.newNews.UserId;
//   NameOfNewsOwner(id) {
//     const Nameof = this.newsService.getById(User => this.userFromApi.ID === id)
//  }
  addNews() {
    this.newNews = {
      Content: this.newNews.Content,
      ID: this.newNews.ID,
      Photo: this.response.dbPath,
      Date:this.newNews.Date,
      UserId:this.newNews.UserId
    }
      this.newsService.add(this.newNews);

  }

  public uploadFinished = (event) => {
    this.response = event;
  }
  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }


}

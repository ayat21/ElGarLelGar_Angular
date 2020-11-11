import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { Skill } from 'src/app/Models/skill';
import { Observable } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import { HttpClient } from '@angular/common/http';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  public response: {'dbPath': ''}; 
  public currentUser: User;
  public userFromApi: User;
  public newSkillID:number;
  public UserNAme:String;
  public isCreate: boolean;
  imgPath:string; 
  public newSkill: Skill = new Skill();
  public SkillList$: Observable<Skill[]>;
  constructor(private skillService: SkillService,
    authentication:LayoutService,private http: HttpClient) {
    this.currentUser = authentication.currentUserValue;
    this.newSkillID= this.currentUser.ID;
    this.UserNAme=this.currentUser.Name;
    this.newSkill.UserId=this.newSkillID;
    this.SkillList$ = this.skillService.SkillBehaviorSubject.asObservable();
    this.imgPath=this.currentUser.Photo;
  //  this.passedPhotoPath=this.response.dbPath;
  //  this.newNews.Photo:this.passedPhotoPath;

   }
   
 
   error: {};
  ngOnInit() {
    this.skillService.GetUsersSkills();
    

  }
  id=this.newSkill.UserId;
//   NameOfNewsOwner(id) {
//     const Nameof = this.skillService.getById(User => this.userFromApi.ID === id)
//  }
addSkill() {
    this.newSkill = {
      Name: this.newSkill.Name,
      ID: this.newSkill.ID,
      Photo: this.response.dbPath ,
      UserId:this.newSkill.UserId,
      Description:this.newSkill.Description,
      Price:this.newSkill.Price,
      Date:this.newSkill.Date
    }
      this.skillService.add(this.newSkill);

  }
  deletetSkill(SkillIdToDelete: number) {
    console.log(SkillIdToDelete);
    this.skillService.remove(SkillIdToDelete);
  }
  public uploadFinished = (event) => {
    this.response = event;
  }
 
  

  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }


}

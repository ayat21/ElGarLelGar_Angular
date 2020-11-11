import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { User } from 'src/app/Models/user';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Skill } from 'src/app/Models/skill';
import { SkillUsers } from 'src/app/Models/SkillUsers';
import { DatePipe } from '@angular/common';
import { AssetService } from 'src/app/services/asset.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { NewsService } from 'src/app/services/news.service';
import { Role } from 'src/app/Models/role';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  loading = false;
  currentUser: User;
  userFromApi: User;
  dataSaved = false;  
  assetForm:FormGroup;  
  allSkills: Observable<Skill[]>;  
  assetIdUpdate = null;  
  massage = null;  
  error: string;
  uploadError: string;
  
  
  submitted=false;
  test: string; 
  imagePath: string;
 
  /**
   *  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: LayoutService
  ) {
     
  }

  
   */
  public skillList$: Observable<SkillUsers[]>;
  constructor( 
    public myservice:AssetService,
      private router: Router,
      private authenticationService: LayoutService,
      private layoutservice:LayoutService,     
    private route: ActivatedRoute,
    private newsService:NewsService,
    private assetService:AssetService,
    private skillservice:SkillService
  ) {
    this.skillList$ = this.skillservice.UsersSkillsBehaviorSubject.asObservable();
    console.log(this.skillList$);
    this.currentUser = this.authenticationService.currentUserValue;  
    console.log( this.currentUser)
  }
 

  ngOnInit() {
    this.skillservice.GetUsersSkills();
    
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

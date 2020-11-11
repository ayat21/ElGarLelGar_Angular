import { Injectable } from '@angular/core';
import { Skill } from '../Models/skill';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {SkillUsers} from '../Models/SkillUsers'
@Injectable({
  providedIn: 'root'
})
export class SkillService {
   
  public SkillBehaviorSubject=new BehaviorSubject<Skill[]>([]);
  public UsersSkillsBehaviorSubject=new BehaviorSubject<SkillUsers[]>([]); 
public sucseede:SkillUsers[];
  constructor(private httpClient: HttpClient) { 
    this.GetUsersSkills();
  }
  public GetUsersSkills()
  {
    this.httpClient.get<SkillUsers[]>('https://localhost:44383/api/Skill/GetUsersSkills')
    .pipe(
      catchError(error => {
        console.log('Error caught', error);
        return throwError(error);
      })
    )
    .subscribe(
      success => {
        console.log('Success case called');
        this.UsersSkillsBehaviorSubject.next(success)
      },
      error => console.log('Error in subscribe', error),
      () => console.log('Subscribe complete')
    );
  }
  public get() {
    this.httpClient.get<Skill[]>('https://localhost:44383/api/Skill/GetSkills')
      .pipe(
        catchError(error => {
          console.log('Error caught', error);
          return throwError(error);
        })
      )
      .subscribe(
        success => {
          console.log('Success case called');
          this.SkillBehaviorSubject.next(success)
        },
        error => console.log('Error in subscribe', error),
        () => console.log('Subscribe complete')
      );
  }

  public add(SkillToAdd: Skill) {
    return this.httpClient.post<Skill[]>('https://localhost:44383/api/Skill/AddSkill',
    SkillToAdd)
      .subscribe(response => {
        
        this.SkillBehaviorSubject.next(this.SkillBehaviorSubject.getValue().
        concat(response));
      });
   
}
public update(updatedSkill: Skill) {
  return this.httpClient.put<Skill>('https://localhost:44383/api/Skill' + '/' + updatedSkill.ID, 
    updatedSkill).subscribe( response => {
      let currentData = this.SkillBehaviorSubject.getValue();
      const index = currentData.findIndex(Skill => Skill.ID == updatedSkill.ID);
      currentData[index] = updatedSkill;
      this.SkillBehaviorSubject.next(currentData);
  },
  (error) => {
    console.log("Error", error);
  }
  )
}

public remove(SkillIdToDelete: number) {
  this.httpClient.delete('https://localhost:44383/api/Skill' + '/' + SkillIdToDelete).subscribe(() => {
    let newAssetList = this.SkillBehaviorSubject.getValue().filter(Skill => Skill.ID!== SkillIdToDelete);
    this.SkillBehaviorSubject.next(newAssetList);
  })
}
}

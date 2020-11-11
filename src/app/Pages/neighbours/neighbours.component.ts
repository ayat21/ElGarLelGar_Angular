import { Component, OnInit } from '@angular/core';
import { AdduserserviceService } from 'src/app/services/adduserservice.service';
import { Neighbours } from 'src/app/Models/neighbours';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-neighbours',
  templateUrl: './neighbours.component.html',
  styleUrls: ['./neighbours.component.css']
})
export class NeighboursComponent implements OnInit {

  constructor(private adduserService:AdduserserviceService ) {
    this.nieghbourList$ = this.adduserService.NeighboursBehaviorSubject.asObservable();
   }
public nieghbourList$: Observable<Neighbours[]>;
  ngOnInit() {
    this.adduserService.GetNeighbours();
  }
  public createPhoto = (serverPath: string) => {
    return `https://localhost:44383/${serverPath}`;
  }
}

import { AssetService } from 'src/app/services/asset.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Asset } from 'src/app/Models/asset';
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  constructor(private myservice:AssetService) { }

  ngOnInit() {
  
  }



 
  }
 


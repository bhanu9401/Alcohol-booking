import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import {AngularFireStorage} from '@angular/fire/storage'
import { CookieService } from 'ngx-cookie-service';
import { Emitter } from '../Emitter/emitter';
@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent implements OnInit {

  resname=''
  beer=''
  bprice:number=0
  vodka=''
  vprice:number=0
  rum=''
  rprice:number=0
  wine=''
  wprice:number=0
  whiskey=''
  whprice:number=0
  brandy=''
  brprice:number=0
  about=''
  imgurl=''
  constructor(public db:AngularFireDatabase,public storage:AngularFireStorage,private UserCoookie:CookieService) { }

  ngOnInit(): void {
    if(this.UserCoookie.get("check")=='true'){
      Emitter.emitter.emit(true)
      if( this.UserCoookie.get('CurrentUser')=='PMkdJ1uZRWadsOdEO3DCwyjfmht2')
        Emitter.admin.emit(true)
    }
  }
  stock=this.db.database;
  storageRef=this.storage.ref('Bars')
  target:any=null
  
  addEvent(event:any)
  {
    this.target=event.target.files[0]
  }
  async Add()
  {
    const metadata={'contentType':this.target.type}
    const uploadtask= this.storageRef.child(this.resname).put(this.target,metadata);
    //uploadtask.getDownloadURL().then((url:any)=>this.imgurl=url)
    console.log("ADD PROD"+this.imgurl)
    if(this.beer)
    {
      await this.stock.ref('stock/beer').child(this.resname).set({
        'about':this.about,
        'price':this.bprice
      })
    }
    if(this.vodka)
    {
      await this.stock.ref('stock/vodka').child(this.resname).set({
        'about':this.about,
        'price':this.vprice
      })
    }
    if(this.rum)
    {
      await this.stock.ref('stock/rum').child(this.resname).set({
        'about':this.about,
        'price':this.rprice
      })
    }
    if(this.wine)
    {
      await this.stock.ref('stock/wine').child(this.resname).set({
        'about':this.about,
        'price':this.wprice
      })
    }
    if(this.whiskey)
    {
      await this.stock.ref('stock/whiskey').child(this.resname).set({
        'about':this.about,
        'price':this.whprice
      })
    }
    if(this.brandy)
    {
      await this.stock.ref('stock/brandy').child(this.resname).set({
        'about':this.about,
        'price':this.brprice
      })
    }
    alert("Updated")
    window.location.reload()
  }

}

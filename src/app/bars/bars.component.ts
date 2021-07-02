import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Emitter } from '../Emitter/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnInit {

  constructor(public route:ActivatedRoute,private db:AngularFireDatabase,private storage:AngularFireStorage,private UserCoookie:CookieService,public router:Router) { }
  type:any=''
  name:any=''
  about:any=''
  price:Number=0
  imgurl:any=''
  bars:any=[]
  url:any=[]
  i:number=-1
  uid:any=''
  storageRef=this.storage.ref('Bars')
  storageLogo=this.storage.ref('Logo')
  logourl:any=''
  ngOnInit(): void 
  {
    if(this.UserCoookie.get("check")=='true'){
      Emitter.emitter.emit(true)
      this.uid= this.UserCoookie.get('CurrentUser');
      if( this.UserCoookie.get('CurrentUser')=='PMkdJ1uZRWadsOdEO3DCwyjfmht2')
        Emitter.admin.emit(true)
    }
    this.route.params.subscribe(params=>{
      this.type=params['id']
    })
    this.Storagefetch()
  }
  fetchUrl(name:string)
  {
    return new Promise<void>((resolve,reject)=>{
      this.storageRef.child(name).getDownloadURL().subscribe({
        next:(res: any)=>{
          this.imgurl=res
          resolve();
        },
        error:(err:any)=>{
          reject(err)
        }
      })
    })
  }
  async Storagefetch()
  {
    this.db.database.ref("stock/"+this.type).get()
    .then((snapshot)=>{
      snapshot.forEach((snap)=>{ 
        this.name=snap.key
          this.fetchUrl(this.name).then(()=>{
            this.name=snap.key
            this.about=snap.val().about 
            this.price=snap.val().price
            this.bars.push({
              name:this.name,
              about:this.about,
              url:this.imgurl,
              slider:1,
              price:this.price
            })
          })
          .catch(e=>{
            console.log(e)
          })
      })
      console.log(this.bars)
      console.log(this.url)
    })
    console.log(this.type)
    ////////////////

    new Promise<void>((resolve,reject)=>{
      this.storageLogo.child("logoM.jpg").getDownloadURL().subscribe({
        next:(res: any)=>{
          this.logourl=res
          resolve();
        },
        error:(err:any)=>{
          reject(err)
        }
      })
    }).then(()=>{
      console.log(this.logourl)
    })

    ////////////
    
  }
  ordref:any=''
  avail:number=0;
  placeOrder(bname:string,count:number)
  {
    // console.log(bname+" "+count+this.type)
    this.ordref=this.db.database.ref('orders/'+this.uid+'/'+bname+'/'+this.type)
  
    
    this.ordref.get()
    .then((snapshot:any)=>{
      this.avail=snapshot.val().quantity
    }).then(()=>{
      this.ordref.set({
        quantity: this.avail+count
      }).then(()=>{
        window.location.reload()
      })
    })
    .catch(()=>
      {
        this.ordref.set({
          quantity:count
      }).then(()=>{
        window.location.reload()
      })
    })
    alert("Order Placed...")
    
  }
}

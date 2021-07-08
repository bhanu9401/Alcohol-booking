import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Emitter } from '../Emitter/emitter';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  logo:string
  constructor(public route:ActivatedRoute,public UserCookie:CookieService,public db:AngularFireDatabase) {
    this.logo=UserCookie.get('logo')
   }
  timer:boolean=false
  type:any=''
  cnt:any=0
  name:any=''
  uid:any=''
  adflag:boolean=false
  ngOnInit(): void {

    if(this.UserCookie.get("check")=='true'){
      Emitter.emitter.emit(true)
      this.uid = this.UserCookie.get('CurrentUser');
      if( this.UserCookie.get('CurrentUser')=='PMkdJ1uZRWadsOdEO3DCwyjfmht2')
      { 
        Emitter.admin.emit(true)
        this.adflag=true
      }
    }
    this.route.params.subscribe(param=>{
      console.log(param)
      this.name=param['name']
      this.type=param['type']
      this.cnt=param['cnt']
    })
    this.orders()
    setTimeout(()=>{
      this.timer=true

    },2000)
  }

  ordref:any=''
  order:any=[]
  fname:string=''
  price:number=0
  total:number=0
  fetchName(uid:string)
  {
    this.db.database.ref('users/'+uid).get().then((namee:any)=>{
      this.fname = namee.val().name
    })
  }
  orders()
  {
    if(this.adflag)
    {
      this.ordref = this.db.database.ref('orders')
      this.ordref.get().then((snapshot:any)=>{
        snapshot.forEach((uid:any) => {
          uid.forEach((bname:any) => {
              bname.forEach((type:any) => {
                  this.fetchName(uid.key)
                  this.db.database.ref('stock/'+type.key+'/'+bname.key).get().then((snapshot:any)=>{
                    this.price= snapshot.val().price  * type.val().quantity
                  }).then(()=>{
                    this.order.push(
                      {
                        uid:uid.key,
                        name:this.fname,
                        bname:bname.key,
                        type:type.key,
                        quantity:type.val().quantity,
                        price:this.price
                      })
                      this.total=this.total+this.price
                    
                  })
                })
          })
          })
        })
    }
    else
    {
      this.ordref = this.db.database.ref('orders/'+this.uid)
      this.ordref.get().then((snapshot:any)=>{
          snapshot.forEach((bname:any) => {
              bname.forEach((type:any) => {
                this.db.database.ref('users/'+snapshot.key).get().then((snapshot:any)=>{
                  this.fname= snapshot.val().name
                }).then(()=>{
                  this.db.database.ref('stock/'+type.key+'/'+bname.key).get().then((snapshot:any)=>{
                    this.price= snapshot.val().price  * type.val().quantity
                  }).then(()=>{
                    this.order.push(
                      {
                        uid:this.uid,
                        name:this.fname,
                        bname:bname.key,
                        type:type.key,
                        quantity:type.val().quantity,
                        price:this.price
                      })
                      this.total=this.total+this.price
                  })
                })
              }) 
            })
          })
    }
  }
  delete(uid:string,bname:string,type:string)
  {
    console.log("In Dele")
    console.log("values "+uid+" "+  bname+" "+type)
    this.db.database.ref('orders/'+uid).child(bname).child(type).remove().then(()=>{
      console.log("Removed")
      window.location.reload()
    })
    
  }

}

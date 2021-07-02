import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import { Emitter } from '../Emitter/emitter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  logosrc:string
  constructor(public auth:AngularFireAuth,private mycookie:CookieService,public router:Router) {
    this.logosrc=mycookie.get('logo')
   }
  navflag:boolean=false;
  adminflag:boolean=false;
  ngOnInit(): void {
    Emitter.emitter.subscribe( (auth:boolean) =>{
       this.navflag=auth;
    })
    Emitter.admin.subscribe( (auth:boolean) =>{
      this.adminflag=auth;
   })
  }
  Logout()
  {
    this.mycookie.delete("CurrentUser")
    //this.mycookie.set('check','false')
    Emitter.emitter.emit(false);
    Emitter.admin.emit(false);
    this.auth.signOut();
    this.mycookie.delete('check')
    this.router.navigate(['/login'])    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Emitter } from '../Emitter/emitter';
import { AngularFireDatabase, AngularFireObject, snapshotChanges } from "@angular/fire/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uid:any=''
  username:any=''
  
  constructor(private router:Router,
    private UserCoookie:CookieService,
    private db:AngularFireDatabase) {

      // Emitter.admin.subscribe(res=>{
      //   this.adminflag=res;
      // })

    if(UserCoookie.get("check")=='true'){
      
        if( UserCoookie.get('CurrentUser')=='PMkdJ1uZRWadsOdEO3DCwyjfmht2')
          Emitter.admin.emit(true)
        Emitter.emitter.emit(true)
        this.uid=UserCoookie.get("CurrentUser")
        this.db.database.ref('users/'+this.uid).get()
        .then((snapshot)=>{
          this.username=snapshot.val().name
        })
        
        console.log(this.username)
        console.log(UserCoookie.get('check'))
    }
    else{
      Emitter.emitter.emit(false)
      this.router.navigate(['/login'])
    }
   }

  ngOnInit(): void {
  }
  

}

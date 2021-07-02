import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { Emitter } from '../Emitter/emitter';
import { CookieService } from 'ngx-cookie-service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string ='';
  password:string='';
  loginfailed = "";
  uid:any=''
  constructor(public auth:AngularFireAuth,
    private router:Router,
    private mycookie: CookieService,
    private tstcookie: CookieService
    ) { 
      // console.log("1st")
      if(this.tstcookie.get('check')=='true' && this.mycookie.get('CurrentUser')!='YSDMIQ6rysP2KNdMoGrxOlLIuLg2')
      { 
        alert("Redirecting...")
        Emitter.emitter.emit(true)
        this.router.navigate(['/'])
      }
      if(this.tstcookie.get('check')=='true' && this.mycookie.get('CurrentUser')=='YSDMIQ6rysP2KNdMoGrxOlLIuLg2')
      {
        alert("Redirecting...")
        Emitter.admin.emit(true)
        this.router.navigate(['/'])
      }
      this.loginfailed = "";
    }

  ngOnInit(): void {
    console.log("2nd")
  }
  Login()
  {
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(res=>{
      console.log(res.user?.uid)
      this.uid=res.user?.uid
        if(this.uid=="YSDMIQ6rysP2KNdMoGrxOlLIuLg2")
        {
          Emitter.admin.emit(true);
          this.mycookie.set('CurrentUser',this.uid);
          this.tstcookie.set('check','true');
          this.router.navigate(['/'])
        }
        else
        {
          Emitter.emitter.emit(true);
          this.mycookie.set('CurrentUser',this.uid);
          this.tstcookie.set('check','true');
          this.router.navigate(['/'])
        }
        
        
    })
    .catch(() =>{
      this.loginfailed ="User doesn't exist";
      alert(this.loginfailed)
      this.router.navigate(['/register'])
    })
  }

}

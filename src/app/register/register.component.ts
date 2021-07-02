import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:string=''
  email:string=''
  password:string=''
  phNo:string=''
  uid:any=''

  
  constructor(public auth:AngularFireAuth,public router:Router,public db:AngularFireDatabase) {
   
  }
  users=this.db.database.ref("users");
  ngOnInit(): void {
  }
//  usernameExists() {
     
//     return (this.db.database.ref("users/"+this.name)!= null);
//   }
Register()
{
  if(this.phNo.length==10 && (this.phNo.charAt(0)=='6' || this.phNo.charAt(0)=='7' || this.phNo.charAt(0)=='8'|| this.phNo.charAt(0)=='9'))
  {
      this.auth.createUserWithEmailAndPassword(this.email,this.password)
      .then((res)=>{
        console.log(res.user?.uid)
        this.uid=res.user?.uid
          this.users.child(this.uid).set({
            'name':this.name,
            'email':this.email,
            'phNo':this.phNo
          }) 
        this.router.navigate(['/login'])
      })
      .catch((err)=>{
        alert(err);
      })
      
  }
  else{
    alert('Phone Number is badly formatted')
  }
}

}

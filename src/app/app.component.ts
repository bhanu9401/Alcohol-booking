import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public logo:CookieService){
    logo.set('logo','https://firebasestorage.googleapis.com/v0/b/olorder-f8a5f.appspot.com/o/Logo%2FlogoM.jpg?alt=media&token=f07d248b-79a5-460a-87e1-a6c050bc11ed')
  }
  title = 'Auth';
  
}


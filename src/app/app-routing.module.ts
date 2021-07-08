import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProdComponent } from './add-prod/add-prod.component';
import { BarsComponent } from './bars/bars.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'bar/:id',component:BarsComponent},
  {path:'addprod',component:AddProdComponent},
  {path:'orders/:name/:type/:cnt',component:OrdersComponent},
  {path:'orders',component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

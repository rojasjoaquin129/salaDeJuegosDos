import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './componentes/chat/chat.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'quien-soy',component:QuienSoyComponent},
  {path:'registro',component: RegistroComponent},
  {path:'chat',component:ChatComponent},
  {path:'list-gamer',loadChildren:()=> import('./list-gamers/list-gamers.module').then( m=>m.ListGamersModule)},
  {path:"" ,redirectTo: 'home',pathMatch:'full'},
 
  {path:'**',component: HomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

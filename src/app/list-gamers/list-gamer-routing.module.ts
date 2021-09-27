import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { MenorMayorComponent } from './menor-mayor/menor-mayor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { PuzzleNumericoComponent } from './puzzle-numerico/puzzle-numerico.component';
import { JuegoAhorcadoComponent } from './juego-ahorcado/juego-ahorcado.component';

const router: Routes=[
{path:'',
children:[

  {path:'menor-mayor',component:MenorMayorComponent},
  {path:'preguntados',component:PreguntadosComponent},
  {path:'puzzle',component:PuzzleNumericoComponent},
  {path:'ahorcado',component:JuegoAhorcadoComponent},
  
    ]    
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports:[RouterModule]
})
export class ListGamerRoutingModule { }

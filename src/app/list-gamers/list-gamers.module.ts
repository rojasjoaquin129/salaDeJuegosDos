import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoAhorcadoComponent } from './juego-ahorcado/juego-ahorcado.component';
import { PuzzleNumericoComponent } from './puzzle-numerico/puzzle-numerico.component';
import { MenorMayorComponent } from './menor-mayor/menor-mayor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { ListGamerRoutingModule } from './list-gamer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    JuegoAhorcadoComponent,
    PuzzleNumericoComponent,
    MenorMayorComponent,
    PreguntadosComponent,
    
  ],
  imports: [
    CommonModule,
    ListGamerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
   
  ]
})
export class ListGamersModule { }

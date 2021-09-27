import { Component } from '@angular/core';

@Component({
  selector: 'app-juego-ahorcado',
  templateUrl: './juego-ahorcado.component.html',
  styleUrls: ['./juego-ahorcado.component.scss']
})
export class JuegoAhorcadoComponent  {

  botones: Array<{ letra: string, estado: string }>=[];
  readonly LETRAS=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','Y','Z'];
  readonly PALABRAS=["JAVASCRIPT","ANGULAR","TYPESCRYPE","FOTOSINTESIS"];
  palabraAdivinada='';
  palabraAleatoria='';
  fallas:Array<string>=[];
  numFallas=0;
  title = 'juegoAhorcado';
  constructor(){
    this.inicializarJuego();
  }
  aleatorio(minimo:number,maximo:number){
    return Math.round(Math.random() * (maximo - minimo) + minimo);
  }
  inicializarJuego(){
    this.palabraAdivinada='';
    this.palabraAleatoria='';
    this.fallas=[];
    this.botones=[];
    this.numFallas=0;
    let numeroAleatorio= this.aleatorio(0,this.PALABRAS.length);
    this.palabraAleatoria=this.PALABRAS[numeroAleatorio];
    this.generalPalabra();
    this.inicializarBotones();
  }

  inicializarBotones(): void {
    
    for (let i = 0; i < this.LETRAS.length; i++) {
        this.botones.push({ letra: this.LETRAS[i], estado: "btn btn-primary" });
    }
}
  generalPalabra(){
    if(this.palabraAleatoria==''){
      let numeroAleatorio= this.aleatorio(0,this.PALABRAS.length);
      this.palabraAleatoria=this.PALABRAS[numeroAleatorio];
    }else{
      for (let i = 0; i < this.palabraAleatoria.length; i++) {
        this.palabraAdivinada+='-';
        
      }
    }
  }
  botonLetra(boton: { letra: string, estado: string}): void{
    if(!this.letraAcertada(boton.letra)){
      boton.estado = "btn btn-danger";
      if(this.numFallas<=5){
        this.aumentaFallos(boton.letra);
      }else{
        alert('perder');
        console.log(this.palabraAleatoria);
        this.inicializarJuego();
      }  
    }else{
      boton.estado = "btn btn-success";
      if(this.palabraAdivinada===this.palabraAleatoria){
        alert('ganaste');
      }
    }
  }

  letraAcertada(letra:string):boolean{
    let letraAcertada=false;
    for (let i = 0; i< this.palabraAleatoria.length; i++) {
      if(letra===this.palabraAleatoria[i]){
          this.palabraAdivinada=(i==0?"":this.palabraAdivinada.substr(0,i))+
          letra+this.palabraAdivinada.substr(i+1);
          letraAcertada=true;
      }
     
    }
    return letraAcertada;

  }
  aumentaFallos(letra:string){
    this.fallas.push(letra);
    this.numFallas++;
  }

 
}



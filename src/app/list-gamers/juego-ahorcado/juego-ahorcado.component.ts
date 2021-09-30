import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
  readonly fallasFotos =[
    "../assets/imagenes/ahorcado/0.jpg" ,
    "../assets/imagenes/ahorcado/1.jpg",
    "../assets/imagenes/ahorcado/2.jpg",
    "../assets/imagenes/ahorcado/3.jpg",
    "../assets/imagenes/ahorcado/4.jpg",
    "../assets/imagenes/ahorcado/5.jpg",
    "../assets/imagenes/ahorcado/6.jpg"
  ]
  fotoMostrar:any;
  constructor( private router:Router){
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
    this.fotoMostrar=this.fallasFotos[this.numFallas];
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
        this.mensajePerdiste();
        console.log(this.palabraAleatoria);
        this.inicializarJuego();
      }
    }else{
      boton.estado = "btn btn-success";
      if(this.palabraAdivinada===this.palabraAleatoria){
       this.mensajevictoria();
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
    this.fotoMostrar=this.fallasFotos[this.numFallas];
  }

  mensajevictoria(){
    let texto="aca";
    Swal.fire({
      //icon: 'success',
      title: 'Felicidades!!! ganaste!!',
      text:'ganaste perro !! con una cantidad de ' +this.numFallas,
      imageUrl: ("../../../assets/imagenes/menor-mayor/victoria.gif"),
      imageHeight: 300,
      confirmButtonText: 'jugar otra partida?',
      showDenyButton: true,
      denyButtonText: 'volver al menu ?',
      padding: '3em',
     background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
     backdrop: `
       rgba(0,0,123,0.4)
       url("https://sweetalert2.github.io/images/nyan-cat.gif")
       left top
       no-repeat
     `
    }).then((result) => {if (result.isConfirmed){
      this.inicializarJuego();
    }else if(result.isDenied){
      this.router.navigate(['./home']);
    }
  })
  }
  mensajePerdiste(){
    let texto="Poprquie no sale lo q quiero";
    Swal.fire({
      //icon: 'success',
      title: 'Lo sentimos!!!',

       text: 'Ha perdido esta vez, pero lo hizo excelente',
      imageUrl: ("../../../assets/imagenes/menor-mayor/derrota.gif"),
      imageHeight: 150,
      imageAlt: 'A tall image',
      confirmButtonText: 'jugar otra partida?',
      showDenyButton: true,
      denyButtonText: 'volver al menu ?',
    }).then((result) => {if (result.isConfirmed){
      this.inicializarJuego();
    }else if(result.isDenied){
      this.router.navigate(['./home']);
    }
  })
  }

}



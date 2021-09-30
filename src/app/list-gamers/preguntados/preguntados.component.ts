import { Component, OnInit } from '@angular/core';
import { ConsumirApiService } from 'src/app/services/consumir-api.service';
import Swal from 'sweetalert2';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  hechizos:any
  personajes:any;
  //juego de avidinar el nombre de la imagen
  imagen:any;
  RespuestaVerdadera:string=" ";
  nombres:any;
  cantidadFotos=5;
  cambiarJuego=false;
  //juego de adivinar la imagen del nombre
  imagenes:any;
  nombreImagen:any
  imagenVerdadera:any;
  ActivarHechizo=false;
  //juego con hechizos adivinar hechizo
  cambiarHechizo=false;
  hechizosArray:any;
  UsoHecizo:any;
  hechizoVerdadero:any
  //adivinar que echizo hace ese uso"
  UsosArray:any
  UsoVerdadero:any
  nombreHechizo:any


  constructor(private service : ConsumirApiService ,private toastr: ToastrService) {
    this.service.obtenerpersonaje().subscribe((personaje:any)=>{
      this.personajes=personaje;
     this.generarRespuestasImagen();
      console.log(this.RespuestaVerdadera);

    },error=>{console.log('error',error)});
    this.service.obtenerHechizos().subscribe((hechizos:any)=>{
      this.hechizos=hechizos;
    },error=>{console.log('error',error)});

  }

  inicialiarJuego(){
    this.cambiarJuego=false;
    this.ActivarHechizo=false;
    this.cambiarHechizo=false;
  }
  compararhechizos(hechizo:any){
      if(hechizo===this.hechizoVerdadero){
       this.ganaste();

      }else{
       this.perdiste();
      }
      this.cantidadFotos--;
      if(this.cantidadFotos!=0){
        this.generarhechizosPreguntas ();
      }else{
      this.cambiarHechizo=true;
      this.cantidadFotos=5;
      this.generarUsosPreguntas();
      }
  }

    compararUso(uso:any){
      if(uso===this.UsoVerdadero){
        this.ganaste();

      }else{
       this.perdiste();
      }
      if(this.cantidadFotos!=0){
        this.generarUsosPreguntas();
      }else{
      alert("fin del juego");

      }

    }



  compararImagen(imagenComparar:any){
    if(imagenComparar==this.imagenVerdadera){
      this.ganaste();

    }else{
     this.perdiste();
    }
    this.cantidadFotos--;
    if(this.cantidadFotos!=0){
      this.generarImagenesPregutas();
    }else{
      this.ActivarHechizo=true;
      this.cantidadFotos=5 // aca reutilizamos el flag para los hechizos
      this.generarhechizosPreguntas();
    }
  }
  compararRespuesta(nombreComparar:string){
    if(nombreComparar==this.RespuestaVerdadera){
      this.ganaste();

    }else{
     this.perdiste();
    }
    this.cantidadFotos--;
    if(this.cantidadFotos!=0){
      this.generarRespuestasImagen();
    }else{
      this.cambiarJuego=true;
      this.generarImagenesPregutas();
      this.cantidadFotos=5;
    }
  }
    generarImagenesPregutas(){
      let vector=this.generarVector(22);
      let vectorImagenes=[];
      let i=0;
      do{
        vectorImagenes[i]=this.personajes[vector[i]].imagen;
        if(i===0){
          this.nombreImagen=this.personajes[vector[i]].personaje;
          this.imagenVerdadera=vectorImagenes[0];
          }
          i++;
     }while(i<4)
     this.imagenes=this.ordenaAleatoreamente(vectorImagenes);
    }

    generarUsosPreguntas(){
      let vector=this.generarVector(71);
      let vectorUsos=[];
      let i=0;
      do{
        vectorUsos[i]=this.hechizos[vector[i]].uso;
        if(i===0){
          this.nombreHechizo=this.hechizos[vector[i]].hechizo;
          this.UsoVerdadero=vectorUsos[i];
        }
        i++;
      }while(i<4)
      this.UsosArray=this.ordenaAleatoreamente(vectorUsos);
    }


    generarhechizosPreguntas(){
      let vector=this.generarVector(71);
      let vectorhechizos=[];
      let i=0;
      do{
        vectorhechizos[i]=this.hechizos[vector[i]].hechizo;
        if(i===0){
          this.UsoHecizo=this.hechizos[vector[i]].uso;
          this.hechizoVerdadero=vectorhechizos[i];
        }
        i++;
      }while(i<4)
      this.hechizosArray=this.ordenaAleatoreamente(vectorhechizos);
    }


    generarRespuestasImagen(){
      let vector=this.generarVector(22);
      let vectorNombres=[];
      let i=0;
      do{

        vectorNombres[i]=this.personajes[vector[i]].personaje;
        if(i===0){
          this.imagen=this.personajes[vector[i]].imagen;
          this.RespuestaVerdadera=vectorNombres[0];
          //this.RespuestaVerdadera=nombre;
        }
        i++;
      }while(i<4)

      //devuelvo el vector desordenado

       this.nombres=this.ordenaAleatoreamente(vectorNombres);
    }



  generarVector(cantidad:number){
    let vector=[];
    for (let i = 0; i < cantidad; i++) {
      vector[i]=i+1;

    }
    return this.ordenaAleatoreamente(vector);
  }
  ordenaAleatoreamente(myArray:any){
   let i,j,k;
   for (i = myArray.length ; i; i--) {
       j = Math.floor(Math.random() * i);
       k = myArray[i - 1];
       myArray[i - 1] = myArray[j];
       myArray[j] = k;
   }
   return myArray;
 }

 ganaste(){
  this.toastr.success('Adivinaste!!','HARRY DICE :',{positionClass:'toast-top-right',timeOut:500  });
 }
 perdiste(){
 this.toastr.error('Uhh le erraste y perdiste una vida' ,'HARRI DICE :' ,{positionClass:'toast-top-left',timeOut:500 });
 }
 mensajevictoria(){
   let texto="aca";
   Swal.fire({
     //icon: 'success',
     title: 'Felicidades!!! ganaste!!',
     text:texto,
     imageUrl: ("../../../assets/imagenes/menor-mayor/victoria.gif"),
     imageHeight: 300,
     confirmButtonText: 'jugar otra partida?',
     showDenyButton: true,
     denyButtonText: 'volver al menu ?',
   }).then((result) => {if (result.isConfirmed){
     this.inicialiarJuego();
   }})
 }
 mensajePerdiste(){
   Swal.fire({
     //icon: 'success',
     title: 'Lo sentimos!!!',
      text: 'Ha perdido esta vez, pero lo hizo excelente',
     imageUrl: ("../../../assets/imagenes/menor-mayor/derrota.gif"),
     imageHeight: 100,
     imageAlt: 'A tall image',
     confirmButtonText: 'jugar otra partida?',
     showDenyButton: true,
     denyButtonText: 'volver al menu ?',
   }).then((result) => {if (result.isConfirmed){
     this.inicialiarJuego();
   }})
 }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadosService } from 'src/app/services/resultados.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-puzzle-numerico',
  templateUrl: './puzzle-numerico.component.html',
  styleUrls: ['./puzzle-numerico.component.scss']
})
export class PuzzleNumericoComponent implements OnInit {

  cajas:Array<{ numero: string, estado: string }>=[];
   numerosGenerados:any
  pocicionDelHueco=0;
  movimientos=0;
  constructor(private router:Router ,public res: ResultadosService) {
  this.inicializarjuego();
  }



  inicializarjuego(){
    this.cajas=[];
    this.iniciarnumeros();
    this.movimientos=0;

  }
  iniciarnumeros(){
    this.numerosGenerados=this.ordenar()
    for (let i = 0; i <this.numerosGenerados.length; i++) {

      if(this.numerosGenerados[i]==='16'){
        console.log(this.numerosGenerados[i]);
        this.pocicionDelHueco=i;
        this.cajas.push({ numero: ' ', estado: "cajas2" });
      }else{
        this.cajas.push({ numero: this.numerosGenerados[i], estado: "cajas" });
      }

  }
  }

  verifiacion(cero:number ,pociTocado :number){
   let flag=false;
   if(cero==3 || cero==7 ||cero==11){
    if(cero-4===pociTocado||cero+4===pociTocado ||cero-1===pociTocado){
      flag=true;
    }
   }else if(cero==4 || cero==8 ||cero==12){
    if(cero-4===pociTocado||cero+4===pociTocado ||cero+1===pociTocado){
      flag=true;
    }
   }else if(cero+1===pociTocado ||cero+4===pociTocado ||cero-4===pociTocado ||cero-1===pociTocado){
    flag=true;
  }


    return flag;
  }


  buscarPocicionActual(numero:string){
    let pocision=0;
    for (let i = 0; i < this.cajas.length; i++) {
      if(numero==this.cajas[i].numero){
        pocision=i;
      }

    }
    return pocision;
  }
  ngOnInit(): void {
  }



  ordenar(){
     const myArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];

    let i,j,k;
    for (i = myArray.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = myArray[i - 1];
        myArray[i - 1] = myArray[j];
        myArray[j] = k;
    }
    return myArray;
  }
   verificarTabla(){
    let todo=0;
    let flag=false;
    const myArray = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
    for (let i = 0; i < this.cajas.length; i++) {
      if(myArray[i]===this.cajas[i].numero){
        todo++;
      }
    }
    if(todo===16){
      flag=true;
    }
    return flag;
   }


  tocoCaja(caja: { numero: string, estado: string}): void{
    console.log(this.cajas);
    let pocicionTocado=this.buscarPocicionActual(caja.numero);
    console.log(this.pocicionDelHueco);
    console.log(pocicionTocado);

    let veri=this.verifiacion(this.pocicionDelHueco,pocicionTocado);
    console.log(veri);
    if(veri){
    let intercambio;
    intercambio=this.cajas[pocicionTocado];
    this.cajas[pocicionTocado]=this.cajas[this.pocicionDelHueco];
    this.cajas[this.pocicionDelHueco]=intercambio;

    this.pocicionDelHueco=pocicionTocado;
    console.log(pocicionTocado);
    console.log(this.pocicionDelHueco);
    this.movimientos++;
    }
    if(this.verificarTabla()){
      this.res.agregarResultado('Gano', 'Preguntados','mov('+this.movimientos+')');
      this.mensajevictoria('ganaste movimientos realizados '+this.movimientos);
    }


}
mensajevictoria(texto:string){
  Swal.fire({
    //icon: 'success',
    title: 'Felicidades!!! ganaste!!',
    text:texto,
    imageUrl: ("../../../assets/imagenes/menor-mayor/victoria.gif"),
    imageHeight: 300,
    confirmButtonText: '¿Jugar otra partida? ',
    showDenyButton: true,
    denyButtonText: '¿Volver al menú?',
    padding: '3em',
     background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
     backdrop: `
       rgba(0,0,123,0.4)
       url("https://sweetalert2.github.io/images/nyan-cat.gif")
       left top
       no-repeat
     `
  }).then((result) => {if (result.isConfirmed){
    this.inicializarjuego();
  }else if(result.isDenied){
    this.router.navigate(['./home']);
  }
})
}
}

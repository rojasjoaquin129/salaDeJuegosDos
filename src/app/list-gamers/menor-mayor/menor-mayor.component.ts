import { Component,  } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-menor-mayor',
  templateUrl: './menor-mayor.component.html',
  styleUrls: ['./menor-mayor.component.scss']
})
export class MenorMayorComponent  {

  title = 'mayor-menor';
  readonly cards = ['♥', '♣', '♦', '♠'];
  readonly numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  readonly vidas=[true,true,true];
  numeroAComparar='';
  numeroCartaAnterior='';
  singleNumero='';
  aparece=false;
  cartaEstatica=false;
  corazones=3;
  flag=false;
  disableBtn=true;
  texto='Espectacular Terminaste con las 3 vidas intactas ,sos un crack!';
  adivinadas=0;
  cantidad=10;
  constructor(private toastr: ToastrService){
    this.inicialiarJuego();

  }
  
  inicialiarJuego(){
    this.corazones=3;
    this.numeroCartaAnterior='';
    this.generadorcarta();
    this.numeroCartaAnterior=this.numeroAComparar;
    this.cartaEstaticae();
    setTimeout(()=>{this.aparece=true ,1000});
    this.disableBtn=true;
    this.cantidad=10;
    this.adivinadas=0;
    this.descontarCorazones();
  }
  

  generadorcarta() :string{
    let singleCard=this.cards[Math.floor(Math.random()*4)];
    this.singleNumero=this.numbers[Math.floor(Math.random()*this.numbers.length)];
    this.numeroAComparar=this.singleNumero+''+singleCard;
    return this.singleNumero;
  }
  
  buscadorDeItem(carta:string):number{
    let numero=0;
    for (let i = 0; i < this.numbers.length; i++) {
      if(carta===this.numbers[i])
      {
        console.log(this.numbers[i]);
        numero=i+1;
      }
      
    }
    return numero;
  }

  descontarCorazones(){
    if(this.corazones===3){
      
      this.vidas[0]=true;
      this.vidas[1]=true;
      this.vidas[2]=true;
    }else {
      if(this.corazones===2)
      {  
       this.texto="Genial te felicito terminaste con 2 vidas a que no terminas sin usar ninguna , te reto!!!"
        this.vidas[0]=false;
      }else{
        if(this.corazones===1){
           this.texto="uuuhh perro ahi nomas eh , pero terminaste con una sola pero genial!! cuanto q no te jugas otra ?"
          this.vidas[1]=false;
        }else{
          this.vidas[2]=false;
          
        }
        
      }
    }
    
  }

  perderVidas(){
    this.corazones--;
    this.descontarCorazones();
    if(this.corazones===0){
      this.mensajePerdiste(); 
      this.disableBtn=false;
    }
  }
  compararCarta(cartaAntes:number ,cartaDespues:number,flag:boolean){
    if(flag){
      if(cartaAntes>cartaDespues){
        this.perdiste();
        this.perderVidas();
        //descuento de corazones
     }else{
        this.ganaste();
        this.adivinadas++;
     }
    }else{
      if(cartaAntes>cartaDespues){
        this.ganaste();
        this.adivinadas++;
     }else{
        this.perdiste();
       this.perderVidas();
        //descuento de corazones

     }
     
    }
    
    this.cantidad--;
    setTimeout(()=>{this.disableBtn=true ,5000});
    setTimeout(()=>{this.aparece=true ,1000});
    setTimeout(()=>{this.flag=false ,1000});
    this.numeroCartaAnterior=this.numeroAComparar;
  }
 
 
 DarVueltaCarta(){
   this.flag=true;
   this.aparece=false;
   this.disableBtn=false;
 }
 ProcesoDelJuego(flagMayorOMenor:boolean){
  console.log(this.corazones);
   if(this.cantidad!==0 && this.corazones!==0 ){
    let numeroAnterior=this.buscadorDeItem(this.singleNumero);
    let CartaSiguente =this.buscadorDeItem(this.generadorcarta());
    this.DarVueltaCarta();
    setTimeout(()=>{this.compararCarta(numeroAnterior,CartaSiguente,flagMayorOMenor)},1500);
    setTimeout(()=>{this.cartaEstaticae()},80000);
    if(this.cantidad===0 && this.corazones!=0){
      this.mensajevictoria();
    }
   }else{
  this.disableBtn=false;
   }
  
 }
cartaEstaticae(){
  this.cartaEstatica=true;
 
}
mayor(){
  this.ProcesoDelJuego(true);
}
menor(){
  this.ProcesoDelJuego(false);


}

ganaste(){
 this.toastr.success('Adivinaste!!','CARTA',{positionClass:'toast-bootm-right' });
}
perdiste(){
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    showConfirmButton: false,
    timer: 1000
  }) 
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
  let texto="Poprquie no sale lo q quiero";
  Swal.fire({
    //icon: 'success',
    title: 'Lo sentimos!!!',
   
     text: 'Ha perdido esta vez, pero lo hizo excelente con '+this.adivinadas+' cartas adivinadas de 20',
    imageUrl: ("../../../assets/imagenes/menor-mayor/derrota.gif"),
    imageHeight: 150, 
    imageAlt: 'A tall image',
    confirmButtonText: 'jugar otra partida?',
    showDenyButton: true,
    denyButtonText: 'volver al menu ?',
  }).then((result) => {if (result.isConfirmed){
    this.inicialiarJuego();
  }})
}


}

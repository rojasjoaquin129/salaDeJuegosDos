import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Scores } from '../componentes/interfaces/store.interface';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class ResultadosService {
  public usuario:any={};


  private itemCollection: AngularFirestoreCollection<Scores> | undefined;
  public resultados: Scores[] = [];
  Existe:boolean=false;
  constructor(
      private authFire: AngularFirestore,
      public authSvc: AngularFireAuth
  ) {
    this.authSvc.authState.subscribe(user=>{
      if(user){
        this.usuario.name=user.displayName;
        this.usuario.email=user.email;
        this.usuario.id=user.uid;
        this.Existe=true;
      }else{
        this.Existe=false;
      }
    });
  }

  cargarResultado(){

    this.itemCollection = this.authFire.collection<Scores>( 'scores', aux => aux.orderBy('fecha', 'desc').limit(50));

    return this.itemCollection.valueChanges().pipe(map((resultados: Scores[]) => {

        this.resultados = [];

        for(let res of resultados){ this.resultados.unshift(res); }

        return this.resultados;
    }))

  }


  agregarResultado(estado: string, juego: string ,vidas:string){

    if(this.Existe){
  let resultados: Scores = {

    fecha: new Date().getTime(),
    estado: estado,
    juego: juego,
    vidas:vidas,
    uid: this.usuario.id,
    uemail: this.usuario.email,

  }
  return this.itemCollection?.add(resultados);
}
return 'no se pudo'
  }



}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Encuesta } from '../componentes/interfaces/encuensta.interface';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private itemCollecttion: AngularFirestoreCollection<Encuesta> | undefined;
  public unaEncuesta:Encuesta[] = [];

  private url: string = '/encuesta';
  public usuario:any={};
  constructor(
      public authSrv: AngularFireAuth,
      private authFire: AngularFirestore
  ) {
    this.authSrv.authState.subscribe(user=>{
      if(user){
        this.usuario.name=user.displayName;
        this.usuario.email=user.email;
        this.usuario.id=user.uid;
      }
    });
  }

  cargarEncuestas() {

    this.itemCollecttion = this.authFire.collection<Encuesta>('encuesta');

    return this.itemCollecttion.valueChanges().pipe(map( (encuesta: Encuesta[] ) => {
         console.log(encuesta);
        this.unaEncuesta = [];
        for (let datos of encuesta) {
          this.unaEncuesta.unshift(datos);
        }
        return this.unaEncuesta;
      }))
  }

  agregarEncuesta(nombre: string, apellido: string, edad: string, telefono: string,
                  juego: string, puntuacion: string, opinion: string, terminos: string) {

    let encuesta:Encuesta ={
      uid: this.usuario.id,
      umail: this.usuario.email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      telefono: telefono,
      juego: juego,
      puntuacion: puntuacion,
      opinion: opinion,
      terminos: terminos,

    }

    return this.itemCollecttion?.add(encuesta);
  }

}

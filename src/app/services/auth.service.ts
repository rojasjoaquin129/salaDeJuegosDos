import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app'
import { first } from 'rxjs/operators';
@Injectable()
export class AuthService {

  public usuario:any={};
  constructor(public auth:AngularFireAuth) { 
    auth.authState.subscribe(user=>{
     
      if(user){
        this.usuario.name=user.displayName;
      this.usuario.id=user.uid;
      }
      
    })
  }
  
  verificarCorreo(){
    this.auth.currentUser.then(user=>{
      if(user){
        user.sendEmailVerification();
      }
    });
  }

  registrar(user:string,password:string){
    return this.auth.createUserWithEmailAndPassword(user,password)
  }

  login(user:string ,password:string){
    return this.auth.signInWithEmailAndPassword(user,password);
  }

  logOut(){
    this.usuario={};
    return this.auth.signOut();
  }
  
  googleAuth(){
    let provider=new firebase.default.auth.GoogleAuthProvider();
    return this.auth.signInWithRedirect(provider);
  }

  getUserLog(){
    return this.auth.authState.pipe(first()).toPromise();
  }
}


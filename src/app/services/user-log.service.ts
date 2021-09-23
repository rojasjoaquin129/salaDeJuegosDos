import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { UsuarioLog } from '../componentes/interfaces/usuarioLog.interfase';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {

  private userLogC: AngularFirestoreCollection<UsuarioLog>;
  private nameCollectionDB ='usuarios';

  constructor(private afs :AngularFirestore) {
    this.userLogC=afs.collection<UsuarioLog>(this.nameCollectionDB);
   }

   async onSaveContact(contactForm:UsuarioLog): Promise<void>
   {
     return new Promise(async(resolve,reject)=>{
       try {
         const id=this.afs.createId(); 
         const data={id, ...contactForm};
         const result= this.userLogC.doc(id).set(data);
         resolve(result);
         
         } catch (error:any) {
         reject(error.message);
         }
     });
   }
 
 
   public saveUserLog(user: UsuarioLog) { 
     return this.userLogC.add(user); 
   }



}

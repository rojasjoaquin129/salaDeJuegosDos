import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogService } from 'src/app/services/user-log.service';
import Swal from 'sweetalert2';
import { UsuarioLog } from '../interfaces/usuarioLog.interfase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private Sauth:AuthService,private router:Router , private log:UserLogService) { }
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public usuario:any;
  public user$: Observable<any>=this.Sauth.auth.user;
  public email=new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]);
  public password=new FormControl('',[Validators.required,Validators.minLength(6)]);
  loginForm=new FormGroup({email:this.email,password:this.password});
  ngOnInit(): void {
  }

async onLogin(){

  const{email,password}=this.loginForm.value;
  try {
    const user=await this.Sauth.login(email,password);
    let fecha=new Date().toLocaleDateString()+"-"+new Date().toLocaleTimeString();
    const usuarioLogeado:UsuarioLog={email,loggedAt:fecha}
    if(user){
      this.log.saveUserLog(usuarioLogeado);
      console.log(usuarioLogeado.loggedAt);
      this.router.navigate(['/home']);
    }
  } catch (e:any) {
    console.log(e.code)
    if(e.code==='auth/wrong-password'){
      this.mensajeError("La contraseña es incorrecta con ese correo");
      this.loginForm.reset();
    }else if(e.code==='auth/user-not-found'){
      this.mensajeError("El usuario no esta autorizado");
      this.loginForm.reset();
    }
  }

}

mensajeError(texto:string){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text:texto,
  })
}

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserLogService } from 'src/app/services/user-log.service';
import Swal from 'sweetalert2';
import { UsuarioLog } from '../interfaces/usuarioLog.interfase';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers:[AuthService]
})
export class RegistroComponent implements OnInit {


  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public email =new FormControl ('',[Validators .required,Validators.pattern(this.emailPattern)]);
  public password=new FormControl('',[Validators.required,Validators.minLength(6)]);
  public registerForm=new FormGroup({email:this.email,password:this.password});

  constructor(private as:AuthService , private router:Router ,private log:UserLogService) {
    
   }

  ngOnInit(): void {
    this.registerForm.reset();
  }


async registrar(){
  const {email,password}=this.registerForm.value;
  try {
    let user=await this.as.registrar(email,password);
    let fecha =new Date().toLocaleDateString()+ " - "+ new Date().toLocaleTimeString();
    const usuarioLogeado:UsuarioLog={email,loggedAt:fecha}

    if(user){
      this.log.saveUserLog(usuarioLogeado);
      console.log(usuarioLogeado.loggedAt);
      this.router.navigate(['/home']);
    }
  } catch (error:any) {
    if(error.code==='auth/email-already-in-use'){
      this.mensajeError('el correo electronico ya esta registrado , intente con otro');
      this.registerForm.reset();
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

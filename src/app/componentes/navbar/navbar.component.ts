import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  @Input()public estaLog=false;
  flag='navbar-toggler';
  flag2='collapse navbar-collapse';
  boton=false;
  public user:any;
  public user$:Observable<any>=this.as.auth.user;


 onSUB(){
    if(this.flag=='navbar-toggler'){
    this.flag='navbar-toggler collaps';
    this.boton=true;
    this.flag2='collapse navbar-collapse show';
    }else{
      this.flag='navbar-toggler';
      this.flag2='collapse navbar-collapse';
    }
  }
  constructor(private as:AuthService ,private router:Router) { }

 async ngOnInit() {
    this.user=await this.as.getUserLog();
    if(this.user){
      this.estaLog=true;
    }
  }
  
  async deslogear(){
    try {
      await this.as.logOut();
      this.onSUB();
      this.router.navigate(['./login']);
    } catch (error) {
      console.log('no pudiste deslogear');
    }
  }
}


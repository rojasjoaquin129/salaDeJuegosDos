import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[AuthService]
})
export class HomeComponent implements OnInit {
  public user:any;
  public user$:Observable<any>=this.as.auth.user;
  public actionChat:Boolean=false;
  constructor(private as:AuthService) { }

  async ngOnInit() {
    this.user=await this.as.getUserLog();
  }

  abrirChat(){
    if(!this.actionChat)
    this.actionChat=true;
    else
    this.actionChat=false;
  }

}
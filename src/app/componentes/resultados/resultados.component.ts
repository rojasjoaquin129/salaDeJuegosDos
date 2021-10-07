import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadosService } from 'src/app/services/resultados.service';
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  public resultados!: Observable<any[]>;
  auxiliar: any;

  constructor(public score: ResultadosService) {

      this.score.cargarResultado().subscribe( () => {

          if(this.auxiliar){
              setTimeout( () => { this.auxiliar.scrollTop = this.auxiliar.scrollHeight; }, 200);
          }
      });
  }

  ngOnInit(): void {
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsumirApiService {
  constructor(private http: HttpClient) { }

  obtenerpersonaje(){
    return this.http.get("https://fedeperin-harry-potter-api.herokuapp.com/personajes");
  }
  obtenerHechizos(){
    return this.http.get("https://fedeperin-harry-potter-api.herokuapp.com/hechizos")
  }
}

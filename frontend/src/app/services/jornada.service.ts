import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  readonly url = "http://localhost:4000/jornada/";

  constructor(private http: HttpClient) { }

  postJornada = (jornada) => this.http.post(this.url, jornada).subscribe(res => { // * not callback
      console.log(`this.brandListService`, {res}); 
    }, error => {
      console.log("Error", error);
    });

  getJornadas = () => this.http.get(this.url);
}

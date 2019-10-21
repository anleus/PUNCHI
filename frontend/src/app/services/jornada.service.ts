import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jornada } from '../models/jornada.model';
import { Observable } from 'rxjs';

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

  //getJornadas = () => this.http.get(this.url);
    getJornadas(): Observable<Jornada[]> {
      return this.http.get<Jornada[]>(this.url);
    }

  //getUserJornadas = (userid) => this.http.get(this.url + userid);
  getUserJornadas(userid): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.url + userid);
  }
}


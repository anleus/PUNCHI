import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Incidencia} from "../models/incidencia";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class IncidenciaService {
  readonly url = "http://localhost:4000/incidencia/";

  constructor(private http: HttpClient) {}

  getIncidencias(): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.url);
  }

  crearIncidencia(incidencia: Incidencia) {
    return this.http.post(this.url, incidencia);
  }

  getIncidenciaByUserId(userId): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.url + "user/" + userId);
  }

  putIncidencia(incidencia: Incidencia) {
    return this.http
      .put(this.url + "user/" + incidencia._id, incidencia)
      .subscribe(response => {
        console.log(response);
      });
  }
}

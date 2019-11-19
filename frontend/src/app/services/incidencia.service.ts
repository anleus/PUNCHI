import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Incidencia } from "../models/Incidencia";
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

  /*getIncidenciaByUserId(userId: string): Promise<any> {
    return this.http
      .get(this.url + "user/" + userId)
      .toPromise()
      .then(this.onGetIncidenciaByUserId.bind(this));
  }
  onGetIncidenciaByUserId(res: any) {
    return Promise.resolve(res);
  }*/

  getIncidenciaByUserId(userId): Observable<Incidencia[]> {
    return this.http.get<Incidencia[]>(this.url + "user/" + userId);
  }

  putIncidencia(incidencia: Incidencia) {
    console.log(incidencia);
    console.log(this.url + "user/" + incidencia.id_user, incidencia);
    return this.http.put(this.url + "user/" + incidencia.id_user, incidencia).subscribe(response => { console.log(response)});
  }
}

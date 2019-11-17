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

  getIncidenciaByUserId(userId: string): Promise<any> {
    return this.http
      .get(this.url + "user/" + userId)
      .toPromise()
      .then(this.onGetIncidenciaByUserId.bind(this));
  }
  onGetIncidenciaByUserId(res: any) {
    return Promise.resolve(res);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Departamento } from "../models/departamento";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DepartamentosService {
  readonly url = "http://localhost:4000/departamentos/";

  constructor(private http: HttpClient) {}

  postDepartamentos = departamentoData =>
    new Promise((resolve, reject) => {
      this.http.post(this.url, departamentoData).subscribe(
        res => {
          // * not callback
          resolve(res);
        },
        error => {
          console.log("Error", error);
        }
      );
    });

  //Cambiado para mejor funcionamiento att:josevi
  //getDepartamentos = () => this.http.get(this.url);

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url);
  }

  getDepartamentoByUsername(username: string): Promise<any> {
    return this.http
      .get(this.url + "nombre/" + username)
      .toPromise()
      .then(this.onGetDepartamentoByName.bind(this));
  }

  onGetDepartamentoByName(res: any) {
    return Promise.resolve(res);
  }

  deleteDept(id: string) {
    return this.http.delete(this.url + id);
  }
  getDepartamentoByUser(user: string) {
    return this.http.get(this.url + `usuarios/${user}`).pipe(
      map(departamento => {
        return departamento;
      })
    );
  }

  getDepartamentoByGestor(user: string) : Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url + `responsable/${user}`);
  }

  getDepartamentoByID(id: string) : Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url + id);
  }
  getDepartamentoByIDObject(id: string) {
    return this.http.get(this.url +  id)
    .pipe(map(dep => {
      console.log(dep)
      return dep;
    }));
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Departamento } from '../models/departamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DepartamentosService {
  readonly url = "http://localhost:4000/departamentos/";

  constructor(private http: HttpClient) {}

  postDepartamentos = departamentoData =>
    this.http.post(this.url, departamentoData).subscribe(
      res => {
        // * not callback
        console.log(`this.brandListService`, { res });
      },
      error => {
        console.log("Error", error);
      }
    );

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
 
  deleteDept(_id: string) {
    return this.http.delete(this.url + "/" + _id);
  }

  //getUserJornadas = userid => this.http.get(this.url + userid);
}

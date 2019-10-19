import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  getDepartamentos = () => this.http.get(this.url);

  //getUserJornadas = userid => this.http.get(this.url + userid);
}

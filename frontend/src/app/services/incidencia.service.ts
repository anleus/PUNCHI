import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Incidencia } from "../models/Incidencia";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
  })
  export class IncidenciaService {
  
    readonly url = "http://localhost:4000/incidencias/";
  
    constructor(private http: HttpClient) { }
  
}
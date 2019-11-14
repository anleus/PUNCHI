import { Component, OnInit,NgModule } from '@angular/core';


@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  Incidencias = {1:2,3:4};
  constructor() { }

  ngOnInit() {
  }

}

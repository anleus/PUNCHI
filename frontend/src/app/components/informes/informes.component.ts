import { Component, OnInit } from '@angular/core';
import { ExportationService } from 'src/app/services/export.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  horasExtraCSV() {
    console.log("Informe de horas extra")
  }

  horasMensualesCSV() {
    console.log("Informe de horas mensuales");
  }

  horasBtwFechasCSV() {
    console.log("Informe de horas entre fechas")
  }
}



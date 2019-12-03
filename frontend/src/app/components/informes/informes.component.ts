import { Component, OnInit } from "@angular/core";
import { ExportationService } from "src/app/services/export.service";

@Component({
  selector: "app-informes",
  templateUrl: "./informes.component.html",
  styleUrls: ["./informes.component.css"]
})
export class InformesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  horasExtraCSV() {
    console.log("Informe de horas extra");
  }

  horasMensualesCSV() {
    console.log("Informe de horas mensuales");
    const rows = [
      ["name1", "city1", "some other info"],
      ["name2", "city2", "more info"]
    ];

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "informeHorasMensuales.csv");
    document.body.appendChild(link);

    link.click();
  }

  horasBtwFechasCSV() {
    console.log("Informe de horas entre fechas");
  }
}

import { Component, NgModule, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { JornadaService } from 'src/app/services/jornada.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

export interface EmployeeHistorial {
  day: string;
  entry: string;
  exit: string;
  hExtra: number;
}

const EMPLOYEE_DATA_EXAMPLE: EmployeeHistorial[] = [
  {day: "2019/10/17", entry: "09:20", exit: "17:00", hExtra: 0 },
  {day: "2019/10/16", entry: "09:20", exit: "20:00", hExtra: 3 },
  {day: "2019/10/15", entry: "19:20", exit: "21:00", hExtra: 0 },
  {day: "2019/10/14", entry: "09:23", exit: "23:50", hExtra: 5 },
  {day: "2019/10/11", entry: "09:20", exit: "17:00", hExtra: 2 },
  {day: "2019/10/10", entry: "08:20", exit: "17:00", hExtra: 1 },
  {day: "2019/10/09", entry: "09:20", exit: "17:00", hExtra: 0 },
];

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css'],
  providers: [JornadaService]
})
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient,
    HttpClientModule,
    HttpHeaders
  ],
  providers: [JornadaService]
    })

export class HistoryTableComponent implements OnInit {
  displayColumns: string[] = ['day', 'entry', 'exit', 'hExtra'];
  dataSource = EMPLOYEE_DATA_EXAMPLE;
  
  ngOnInit() {

  }

  constructor(private jornadaService : JornadaService) { }

}

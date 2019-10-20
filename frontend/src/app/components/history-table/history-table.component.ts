import { Component, NgModule, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { JornadaService } from 'src/app/services/jornada.service';
import { Jornada } from 'src/app/models/jornada.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

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
    HttpHeaders,
    JornadaService
  ],
  providers: [JornadaService]
    })

export class HistoryTableComponent implements OnInit {
  displayedColumns = ['begin', 'end'];

  jornadas: Jornada[];
  dataSource = new JornadaDataSource(this.jornadaService);

  constructor(private jornadaService : JornadaService) { }
  
  ngOnInit() {
    /*this.jornadaService.getJornadas().subscribe(
      resp => {
        this.dataSource = new MatTableDataSource(resp);
      }, err => {
        console.log(err);
      })*/
  }
}

export class JornadaDataSource extends DataSource<any> {
  user: '5d94cb6dd634648da19d6a6c';
  constructor(private jornadaService: JornadaService) {
    super();
  }

  connect(): Observable<Jornada[]> {
    return this.jornadaService.getJornadas();
  }
  disconnect() {}
}

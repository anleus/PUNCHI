import {
  Component,
  NgModule,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { JornadaService } from 'src/app/services/jornada.service';
import { Jornada } from 'src/app/models/jornada.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css'],
  providers: [JornadaService],
})
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient,
    HttpClientModule,
    HttpHeaders,
    JornadaService,
  ],
  providers: [JornadaService],
})
export class HistoryTableComponent implements OnInit {
  displayedColumns = ['day', 'begin', 'end'];
  user = '5d94cb6dd634648da19d6a6c';

  dataSource = new MatTableDataSource();
  // jornadas = new JornadaDataSource(this.jornadaService);

  constructor(private jornadaService: JornadaService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.jornadaService.getUserJornadas(this.user).subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<Jornada>(resp);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  changeToDate(data: string) {
    const date = new Date(data);
    return (
      this.pad2(date.getDate()) +
      '/' +
      this.pad2(date.getMonth()) +
      '/' +
      date.getFullYear()
    );
  }

  changeToTime(data: string) {
    const date = new Date(data);
    return (
      this.pad2(date.getHours()) +
      ':' +
      this.pad2(date.getMinutes()) +
      ':' +
      this.pad2(date.getSeconds())
    );
  }

  pad2(number) {
    return (number < 10 ? '0' : '') + number;
  }
}

/*export class JornadaDataSource extends DataSource<any> {
  user = '5d94cb6dd634648da19d6a6c';
  paginator: MatPaginator;
  constructor(private jornadaService: JornadaService) {
    super();
  }

  connect(): Observable<Jornada[]> {
    return this.jornadaService.getUserJornadas(this.user);
  }
  disconnect() {}
}*/

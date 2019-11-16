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

import { AuthenticationService } from 'src/app/services/auth.service';


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
  

  dataSource = new MatTableDataSource();
  // jornadas = new JornadaDataSource(this.jornadaService);

  constructor(private authservice : AuthenticationService, private jornadaService: JornadaService) {}

  user = this.authservice.currentUser;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    console.log("user _id is" + this.authservice.currentUserValue._id + "\n"
    + "username is: " + this.authservice.currentUserValue.username);
    this.jornadaService.getUserJornadas(this.authservice.currentUserValue._id).subscribe(
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
      this.pad2(date.getMonth() + 1) +
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


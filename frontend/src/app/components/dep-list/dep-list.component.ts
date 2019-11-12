import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/users';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentosComponent } from '../departamentos/departamentos.component';

@Component({
  selector: 'app-dep-list',
  templateUrl: './dep-list.component.html',
  styleUrls: ['./dep-list.component.css'],
  providers: [DepartamentosService]
})
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient,
    HttpClientModule,
    HttpHeaders,
    UserService,
  ],
  providers: [DepartamentosService],
})
export class DepListComponent implements OnInit {
  displayedColumns = ['Nombre','Gestor','select']
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);
  constructor(private departamentosService: DepartamentosService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  deleteDepartamentoSelected(element: Departamento) {
    this.departamentosService.deleteDept(element._id).subscribe(
      () => {window.location.reload()}
    )
  }
  
  ngOnInit() {
    this.departamentosService.getDepartamentos().subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<Departamento>(resp);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

import { Component, OnInit,NgModule } from '@angular/core';
import { Router } from '@angular/router'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['usuario', 'asunto', 'mensaje', 'estado'];

  constructor( private router: Router) { 
  }


  ngOnInit() {
  }

}

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

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  providers: [UserService],
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
  providers: [UserService],
})
export class UsersTableComponent implements OnInit {
  displayedColumns = ['apellidos', 'nombre', 'select'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<User>(true, []);

  constructor(private userService: UserService) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  deleteUserSelected(element: User) {
    this.userService.deleteUser(element._id).subscribe(
      () => {window.location.reload()}
    )
  }

  ngOnInit() {
    this.userService.getUsersNoDeleted().subscribe(
      (resp) => {
        this.dataSource = new MatTableDataSource<User>(resp);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

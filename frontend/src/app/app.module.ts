import { MaterialModule } from "./material-module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";
import { HttpClientModule } from "@angular/common/http";
import { InicioComponent } from "./components/inicio/inicio.component";
import { MainNavComponent } from "./components/main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { FichaPersonalComponent } from "./components/ficha-personal/ficha-personal.component";
import { DepartamentosComponent } from "./components/departamentos/departamentos.component";
import { AsignarDepComponent } from "./components/asignar-dep/asignar-dep.component";
import { HistoryTableComponent } from "./components/history-table/history-table.component";
import { LoginComponent } from "./components/login/login.component";
import { UserListComponent } from "./components/asignar-dep/user-list/user-list.component";
import { ModificarFichaAdminComponent } from "./components/modificar-ficha-admin/modificar-ficha-admin.component";
import { UserService } from "./services/user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CrearDepartamentoComponent } from "./components/crear-departamento/crear-departamento.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AsignarDepDragComponent } from './components/asignar-dep-drag/asignar-dep-drag.component';
import { DepListComponent } from './components/dep-list/dep-list.component';

const routes: Routes = [
  { path: "usuarios", component: UsuariosComponent },
  { path: "crearusuario", component: CrearUsuarioComponent },
  { path: "inicio", component: InicioComponent },
  { path: "departamentos", component: DepartamentosComponent },
  { path: "fichapersonal", component: FichaPersonalComponent },
  { path: "fichapersonaladmin", component: ModificarFichaAdminComponent },
  //{ path: "informes" },
  //{ path: "vacaciones" },
  //{ path: "incidencias" },
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: '**', redirectTo: "inicio"}
];

@NgModule({
  declarations: [
    AppComponent,
    CrearUsuarioComponent,
    InicioComponent,
    MainNavComponent,
    FichaPersonalComponent,
    DepartamentosComponent,
    AsignarDepComponent,
    HistoryTableComponent,
    LoginComponent,
    UserListComponent,
    ModificarFichaAdminComponent,
    CrearDepartamentoComponent,
    UsersTableComponent,
    UsuariosComponent,
    AsignarDepDragComponent,
    DepListComponent
  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}

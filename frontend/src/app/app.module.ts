import { MaterialModule } from "./material-module";
import { BrowserModule, DomSanitizer } from "@angular/platform-browser";
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
import { IncidenciasComponent } from "./components/incidencias/incidencias.component";
import { InformesComponent } from "./components/informes/informes.component";
import { CalendarioComponent } from "./components/calendario-incidencias/calendario-incidencias.component";
import { AsignarDepComponent } from "./components/asignar-dep/asignar-dep.component";
import { HistoryTableComponent } from "./components/history-table/history-table.component";
import { LoginComponent } from "./components/login/login.component";
import { UserListComponent } from "./components/asignar-dep/user-list/user-list.component";
import { ModificarFichaAdminComponent, ConfirmModificUsuario } from "./components/modificar-ficha-admin/modificar-ficha-admin.component";
import { UserService } from "./services/user.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CrearDepartamentoComponent } from "./components/crear-departamento/crear-departamento.component";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import {
  UsuariosComponent,
  ConfirmacionBorrarUsuario
} from "./components/usuarios/usuarios.component";
import {
  DepListComponent,
  OverviewConfirmacionBorradoDep
} from "./components/dep-list/dep-list.component";
import { IgxCalendarModule } from "igniteui-angular";
import { IgxCalendarComponent, IgxDialogComponent } from "igniteui-angular";
import { AuthGuard } from "./auth/auth.guard";
import { VacacionesComponent } from "./components/vacaciones/vacaciones.component";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  PersonalizarDepartamentoComponent,
  OverviewConfirmacionEditDep
} from "./components/personalizar-departamento/personalizar-departamento.component";
import { HistoryTableSelectedComponent } from "./components/history-table-selected/history-table-selected.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NotificationDropDownComponent } from './notification-drop-down/notification-drop-down.component';
/*import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};*/
const routes: Routes = [
  { path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuard] },
  {
    path: "crearusuario",
    component: CrearUsuarioComponent,
    canActivate: [AuthGuard]
  },
  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  {
    path: "departamentos",
    component: DepartamentosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "personalizarDepartamento",
    component: PersonalizarDepartamentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "fichapersonal",
    component: FichaPersonalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "fichapersonaladmin",
    component: ModificarFichaAdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "calendario",
    component: CalendarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "incidencias",
    component: IncidenciasComponent,
    canActivate: [AuthGuard]
  },
  { path: "informes", component: InformesComponent, canActivate: [AuthGuard] },
  {
    path: "vacaciones",
    component: VacacionesComponent,
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "inicio", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "inicio" }
];

@NgModule({
  declarations: [
    AppComponent,
    CrearUsuarioComponent,
    InicioComponent,
    MainNavComponent,
    FichaPersonalComponent,
    CalendarioComponent,
    IncidenciasComponent,
    InformesComponent,
    DepartamentosComponent,
    AsignarDepComponent,
    HistoryTableComponent,
    LoginComponent,
    UserListComponent,
    ModificarFichaAdminComponent,
    CrearDepartamentoComponent,
    UsersTableComponent,
    UsuariosComponent,
    DepListComponent,
    OverviewConfirmacionBorradoDep,
    ConfirmacionBorrarUsuario,
    PersonalizarDepartamentoComponent,
    VacacionesComponent,
    HistoryTableSelectedComponent,
    OverviewConfirmacionEditDep,
    ConfirmModificUsuario,
    NotificationDropDownComponent
  ],
  entryComponents: [
    UsuariosComponent,
    ConfirmacionBorrarUsuario,
    OverviewConfirmacionBorradoDep,
    ConfirmacionBorrarUsuario,
    VacacionesComponent,
    PersonalizarDepartamentoComponent,
    OverviewConfirmacionEditDep,
    ModificarFichaAdminComponent, 
    ConfirmModificUsuario
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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IgxCalendarModule,
    MatListModule,
    FullCalendarModule,
    //NotifierModule.withConfig(customOptions)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}

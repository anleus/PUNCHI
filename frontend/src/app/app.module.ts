import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SignListComponent } from './components/sign-list/sign-list.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HistoryTableComponent } from './history-table/history-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'; 
import { FichaPersonalComponent } from './components/ficha-personal/ficha-personal.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { AsignarDepComponent } from './components/asignar-dep/asignar-dep.component';


const routes: Routes = [
  { path: 'crearusuario', component: CrearUsuarioComponent},
  { path: 'inicio', component: InicioComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'departamentos', component: DepartamentosComponent},
  { path: 'fichapersonal', component: FichaPersonalComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    SignListComponent,
    CrearUsuarioComponent,
    InicioComponent,
    MainNavComponent,
    HistoryTableComponent,
    LoginComponent,
    FichaPersonalComponent,
    DepartamentosComponent,
    AsignarDepComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { MaterialModule } from './material-module'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SignListComponent } from './components/sign-list/sign-list.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HistoryTableComponent } from './history-table/history-table.component';
import { FichaPersonalComponent } from './components/ficha-personal/ficha-personal.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { AsignarDepComponent } from './components/asignar-dep/asignar-dep.component';


const routes: Routes = [
  { path: 'crearusuario', component: CrearUsuarioComponent},
  { path: 'inicio', component: InicioComponent},
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
    FichaPersonalComponent,
    DepartamentosComponent,
    AsignarDepComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

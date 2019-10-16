import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

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
import { FichaPersonalComponent } from './components/ficha-personal/ficha-personal.component';
import { DepartamentosComponent } from './components/departamentos/departamentos.component';
import { AsignarDepComponent } from './components/asignar-dep/asignar-dep.component';
import {MatNativeDateModule} from '@angular/material/core';
import { NgbdDatepickerPopup } from './components/datepicker-popup/datepicker-popup.component';

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
    AsignarDepComponent,
    DatepickerPopupComponent,
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
    MatNativeDateModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

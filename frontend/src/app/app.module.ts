import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SignListComponent } from './components/sign-list/sign-list.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { InicioComponent } from './components/inicio/inicio.component';


const routes: Routes = [
  { path: 'crearusuario', component: CrearUsuarioComponent},
  { path: 'inicio', component: InicioComponent},
  { path: '', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    TopBarComponent,
    SignListComponent,
    CrearUsuarioComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { JornadaService } from 'src/app/services/jornada.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/services/auth.service';
import { VacationService } from  'src/app/services/vacation.service';

import { environment } from "src/environments/environment";


/**
 *  Misteriosamente si pongo esto dentro de la clase no funciona,
 *  de momento se quedará aqui, si, se que es mas feo que pegarle a un padre pero es lo que hay ¯\_(ツ)_/¯  
 */
var t;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ JornadaService,
    AuthenticationService
  ]
})
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClient,
    HttpClientModule,
    HttpHeaders
  ],
  providers: [JornadaService,
    AuthenticationService
  ]})

export class InicioComponent implements OnInit {

  fichando = false;
  icon = 'play_arrow';
  text = 'Fichar';
  class = 'nofichando';
  tiempoFichando = 0;
  timeLabel = '00:00:00';
  startHour; endHour;
  startLabel = "00:00:00";
  vacations;
  left; pending;

  constructor(private jornadaService : JornadaService, 
              private authService : AuthenticationService, 
              private vacationService: VacationService
              ) {}

  ngOnInit() {
    if(this.authService.currentUserValue.becario)
      this.setDisabledButton();
    else if(localStorage.getItem('jornada')){
      this.toggleFicharState(true);
      var timeStart = new Date(JSON.parse(localStorage.getItem('jornada')).begin);
      var now = new Date()
      this.tiempoFichando = Math.floor((now.getTime() - timeStart.getTime()) / 1000);
      this.startLabel = this.getCurrentHour(timeStart, true);
    }
    this.jornadaService.getUserVacations().subscribe(docs => {this.left = docs[0].left; this.pending = docs[0].pending.length;});
  }

  toggleFicharState(onInit = false){
    if(this.authService.currentUserValue.becario) return;
    this.fichando = !this.fichando;
    this.icon =  !this.fichando ? 'play_arrow' : 'stop';
    this.text = !this.fichando ? 'Fichar' : 'Salida';
    if(this.fichando){
      t = setInterval(() => {++this.tiempoFichando; this.updateTimeLabel()}, 1000);
      if(!onInit)
        this.startJornada();
    }
    else{
      clearInterval(t);
      this.endHour = new Date;
      this.completarJornada();
      delete(this.startHour);
    }
  }

  handleDateClick(arg) {
    console.log('¡Hola! ¡Lo que acabas de hacer no hace nada!');
  }

  handleSelectDate(arg) {
    console.log('¡Y esto tampoco!');
  }

  private startJornada() {
    var hour = new Date;
    if (!this.startHour)
      this.startLabel = this.getCurrentHour(hour, true);
    var currJornada = {begin: hour};
    localStorage.setItem('jornada', JSON.stringify(currJornada));
  }

  private getCurrentHour(date ,start = false) {
    if(start)
      this.startHour = date;
    var hour = this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes()) + ':' + this.pad2(date.getSeconds());
    return hour;
  }

  updateTimeLabel(){
    if(this.tiempoFichando > 1) //Lleva ya trabajando 8 horas (28800sec) //TODO: coger de cada usuario las horas que haga
      //document.getElementById('warningHorasExtra').removeAttribute('style');
    var seconds = this.pad2(this.tiempoFichando % 60);
    var minutes = this.pad2(Math.floor(this.tiempoFichando / 60));
    var hour = this.pad2(Math.floor(this.tiempoFichando/ 3600));
    this.timeLabel = `${hour}:${minutes}:${seconds}`;
  }

  setDisabledButton(){
    this.text = "No puedes fichar";
    this.icon = '';
  }

  completarJornada(){
    var user = this.authService.getCurrentUser();
    var jornada = {
      begin: this.startHour,
      end: this.endHour,
      user: (user ? user.source["_value"]._id : '5d94cb6dd634648da19d6a6c')
    }
    localStorage.removeItem('jornada');
    this.jornadaService.postJornada(jornada);
  }

  pad2(number) {
   return (number < 10 ? '0' : '') + number
  }

  botonFicharDisabled() : boolean {
    return false;
    /* var d = new Date
    var currentDay = d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear();
    var user = this.authService.currentUserValue;

    if (user.becario) {
      return true;
    } else {
      this.vacationService.getVacationByUsername(user._id).then(res => {
        if(res == null || typeof res =="undefined") {
          return false;
        }
        res.past.forEach(vac => {
          var vacDay = vac.getDay() + "-" + vac.getMont() + "-" + vac.getFullYear();
          if (vacDay == currentDay) return true;
        }
        );
        return false;
      });
    } */
  }
}

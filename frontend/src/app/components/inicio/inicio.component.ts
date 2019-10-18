import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 *  Misteriosamente si pongo esto dentro de la clase no funciona,
 *  de momento se quedará aqui, si, se que es mas feo que pegarle a un padre pero es lo que hay ¯\_(ツ)_/¯  
 */
var t; 
const endpoint = 'http://localhost:3000/api/v1/'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@NgModule({
  declarations: [InicioComponent],
  imports: [
    BrowserModule,
    HttpClientModule, HttpClient],
  providers: [],
  bootstrap: [InicioComponent]
})
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  fichando = false;
  icon = 'play_arrow';
  text = 'Empezar jornada';
  class = 'nofichando';
  tiempoFichando = 0;
  timeLabel = '00:00:00';
  startHour; endHour;

  constructor(/*private http : HttpClient*/) { }

  ngOnInit() {
  }

  toggleFicharState(){
    this.fichando = !this.fichando;
    this.icon =  !this.fichando ? 'play_arrow' : 'stop';
    this.text = !this.fichando ? 'Empezar jornada' : 'Terminar jornada';
    if(this.fichando){
      t = setInterval(() => {++this.tiempoFichando; this.updateTimeLabel()}, 1000);
      if(!this.startHour)
        this.startHour = this.getCurrentHour();
    }
    else{
      clearInterval(t);
      this.endHour = this.getCurrentHour();
      this.completarJornada();
    }
  }

  private getCurrentHour() {
    var date = new Date();
    var hour = this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes()) + ':' + this.pad2(date.getSeconds());
    return hour;
  }

  updateTimeLabel(){
    if(this.tiempoFichando > 10) //Lleva ya trabajando 8 horas (28800sec) //TODO: coger de cada usuario las horas que haga
      document.getElementById('warningHorasExtra').removeAttribute('style');
    var seconds = this.pad2(this.tiempoFichando % 60);
    var minutes = this.pad2(Math.floor(this.tiempoFichando / 60));
    var hour = this.pad2(Math.floor(this.tiempoFichando/ 3600));
    this.timeLabel = `${hour}:${minutes}:${seconds}`;

  }

  completarJornada(){
    var jornada = {
      begin: this.startHour,
      end: this.endHour,
      user: 'IDKMAN'
    }
    //this.http.post('http://localhost:4000/jornada',JSON.stringify(jornada), httpOptions);
  }

  pad2(number) {
   return (number < 10 ? '0' : '') + number
  }
}

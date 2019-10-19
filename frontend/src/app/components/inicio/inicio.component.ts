import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { JornadaService } from 'src/app/services/jornada.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
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

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [ JornadaService]
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
  providers: [JornadaService]
    })

export class InicioComponent implements OnInit {

  fichando = false;
  icon = 'play_arrow';
  text = 'Empezar jornada';
  class = 'nofichando';
  tiempoFichando = 0;
  timeLabel = '00:00:00';
  startHour; endHour;
  startLabel = "00:00:00";

  constructor(private jornadaService : JornadaService) { }

  ngOnInit() {
  }

  toggleFicharState(){
    this.fichando = !this.fichando;
    this.icon =  !this.fichando ? 'play_arrow' : 'stop';
    this.text = !this.fichando ? 'Empezar jornada' : 'Terminar jornada';
    if(this.fichando){
      t = setInterval(() => {++this.tiempoFichando; this.updateTimeLabel()}, 1000);
      if(!this.startHour)
        this.startLabel = this.getCurrentHour(true);
    }
    else{
      clearInterval(t);
      this.endHour = new Date;
      this.completarJornada();
    }
  }

  private getCurrentHour(start = false) {
    var date = new Date();
    if(start)
      this.startHour = date;
    var hour = this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes()) + ':' + this.pad2(date.getSeconds());
    return hour;
  }

  updateTimeLabel(){
    if(this.tiempoFichando > 1) //Lleva ya trabajando 8 horas (28800sec) //TODO: coger de cada usuario las horas que haga
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
      user: '5d94cb6dd634648da19d6a6c'//TODO: sacar id del usuario conectado
    }
    this.jornadaService.postJornada(jornada);
  }

  pad2(number) {
   return (number < 10 ? '0' : '') + number
  }
}

import { Component, OnInit, Injectable } from '@angular/core';
/** 
 *  Misteriosamente si pongo esto dentro de la clase no funciona,
 *  de momento se quedará aqui, si, se que es mas feo que pegarle a un padre pero es lo que hay ¯\_(ツ)_/¯
*/
var t; 


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

  constructor() { }

  ngOnInit() {
  }

  toggleFicharState(){
    this.fichando = !this.fichando;
    this.icon =  !this.fichando ? 'play_arrow' : 'stop';
    this.text = !this.fichando ? 'Empezar jornada' : 'Terminar jornada';
    this.class = !this.fichando ? 'nofichando' : 'fichando';
    if(this.fichando)
      t = setInterval(() => {++this.tiempoFichando; this.updateTimeLabel()}, 1000);
    else
      clearInterval(t);
  }

  updateTimeLabel(){
    var seconds = this.pad2(this.tiempoFichando % 60);
    var minutes = this.pad2(Math.floor(this.tiempoFichando / 60));
    var hour = this.pad2(Math.floor(this.tiempoFichando/ 3600));
    this.timeLabel = `${hour}:${minutes}:${seconds}`;

  }

  pad2(number) {
   return (number < 10 ? '0' : '') + number
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxCalendarComponent, IgxDialogComponent } from "igniteui-angular";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {
  @ViewChild('calendar', { static: true }) public calendar: IgxCalendarComponent;
  @ViewChild("alert", { static: true }) public dialog: IgxDialogComponent;

  public dayselected : Date;
  
  constructor() { 
    
  }

  ngOnInit() {
  }

  changeSelectedDate(date : Date){
    this.dayselected = date;
    
  }

}

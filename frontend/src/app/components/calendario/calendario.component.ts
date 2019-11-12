import { NgModule,CUSTOM_ELEMENTS_SCHEMA, OnInit, Component, LOCALE_ID } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
//import { AngularCalendarYearViewModule } from 'angular-calendar-year-view';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PlatformModule } from '@angular/cdk/platform';
@NgModule({
  imports: [
    BrowserModule,
    //AngularCalendarYearViewModule,
    PopoverModule,
    PlatformModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ]
})
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nothingToshowText:any='Nothing to show'; // "By default" => There are no events scheduled that day. 
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
  actions: any[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      name: 'delete'
    },
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      name: 'edit'
    }
  ];
  events: any = [
    {
      start: new Date(),
      end: new Date(),
      title: 'title event 1',
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: new Date(),
      end: new Date(),
      title: 'title event 2',
      color: this.colors.yellow,
      actions: this.actions
    }
  ]
  viewDate: Date = new Date();
  themecolor: any = '#0a5ab3'

  eventClicked(event) {
    console.log(event);
  }
   actionClicked(event) {
    console.log('action',event.action)
    console.log('event',event.event)
  }
}

import { Component, OnInit } from '@angular/core';

export interface SubHoliday {
  name: string;
  number: Number;
}

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  lista : SubHoliday[] = [
    {
      name: "aa",
      number: 2
    },
    {
      name: "ab",
      number: 5
    },
    {
      name: "ba",
      number: 7
    },
    {
      name: "bb",
      number: 9
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

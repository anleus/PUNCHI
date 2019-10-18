import { Component } from '@angular/core';

export interface EmployeeHistorial {
  day: string;
  entry: string;
  exit: string;
  hExtra: number;
}

const EMPLOYEE_DATA_EXAMPLE: EmployeeHistorial[] = [
  {day: "2019/10/17", entry: "09:20", exit: "17:00", hExtra: 0 },
  {day: "2019/10/16", entry: "09:20", exit: "20:00", hExtra: 3 },
  {day: "2019/10/15", entry: "19:20", exit: "21:00", hExtra: 0 },
  {day: "2019/10/14", entry: "09:23", exit: "23:50", hExtra: 5 },
  {day: "2019/10/11", entry: "09:20", exit: "17:00", hExtra: 2 },
  {day: "2019/10/10", entry: "08:20", exit: "17:00", hExtra: 1 },
  {day: "2019/10/09", entry: "09:20", exit: "17:00", hExtra: 0 },
];

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent {
  displayColumns: string[] = ['day', 'entry', 'exit', 'hExtra'];
  dataSource = EMPLOYEE_DATA_EXAMPLE;
  

}

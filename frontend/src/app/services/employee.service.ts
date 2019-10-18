import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[];
  
  readonly URL_API = '';

  constructor(private http: HttpClient) {
    this.selectedEmployee = new Employee();
  }

  postEmployee(employee: Employee) {
    return this.http.post(this.URL_API, employee);
  }

  getEmployees() {
    return this.http.get(this.URL_API);
  }

  putEmployee(employee: Employee) {
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

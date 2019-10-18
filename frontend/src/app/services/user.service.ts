import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  employees: User[];
  
  readonly URL_API = '';

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  postUser(employee: User) {
    return this.http.post(this.URL_API, employee);
  }

  getUser() {
    return this.http.get(this.URL_API);
  }

  putUser(employee: User) {
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

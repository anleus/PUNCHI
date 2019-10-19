import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;
  users: User[];
  
  readonly URL_API = '';

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  postUser(user: User) {
    return this.http.post(this.URL_API, user);
  }

  getUser() {
    return this.http.get(this.URL_API);
  }

  putUser(user: User) {
    return this.http.put(this.URL_API + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

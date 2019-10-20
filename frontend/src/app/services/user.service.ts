import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/users";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
  selectedUser: User;
  users: User[];

  url: string = "";

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.url = environment.url + "/users";
  }

  crearUsuario(user: User) {
    return this.http.post(this.url, user);
  }

  postUser(user: User) {
    return this.http.post(this.url, user);
  }

  getUsers() {
    return this.http.get(this.url);
  }

  getUserByUsername(username: string): Promise<any> {
    return this.http
      .get(this.url + "/username/" + username)
      .toPromise()
      .then(this.onGetUserByName.bind(this));
  }

  getUserById(id: string): Promise<User> {
    return this.http
      .get(this.url + "/" + id)
      .toPromise()
      .then(this.onGetUserById.bind(this));
  }

<<<<<<< HEAD
  getUserById(_id) {
    return this.http.get(this.URL_API + `/users/${_id}`);
=======
  onGetUserById(res: any) {
    return Promise.resolve(res);
  }

  onGetUserByName(res: any) {
    return Promise.resolve(res);
>>>>>>> c4b5f641a002d52c37eaaae10f2dc9cd660ac845
  }

  putUser(user: User) {
    return this.http.put(this.url + "/" + user._id, user);
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + "/" + id);
  }
}

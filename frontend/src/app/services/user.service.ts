import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/users";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  selectedUser: User;
  users: User[];

  url: string = "";

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.url = environment.urlb + "/users";
  }

  crearUsuario(user: User) {
    return this.http.post(this.url, user);
  }

  postUser(user: User) {
    return this.http.post(this.url, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  
  getUserByUsernameDOS(username) { //metodo diferente porque a Laura no  le funciona el otro
    //console.log(username)
    //console.log(`${this.AUTH_SERVER}/users/username/${username}`)
    return this.http.get(this.url + `/username/${username}`)
    .pipe(map(user => {
        console.log('User from user.service: ' + user)
        return user;
      }));
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

  onGetUserById(res: any) {
    return Promise.resolve(res);
  }

  onGetUserByName(res: any) {
   //console.log("USERSERIVE 2");
    //console.log(res);
    return Promise.resolve(res);
  }

  putUser(user: User) {
    return this.http.put(this.url + "/" + user._id, user).subscribe(response => {});
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + "/" + id);
  }

  getUsersNonDeleted(cond: boolean): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/deleted/" + cond);
  }
}

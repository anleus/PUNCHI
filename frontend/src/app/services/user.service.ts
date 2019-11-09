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

  getUserByUsernameDOS(username) {
    return this.http.get(this.url + `/username/${username}`)
      .pipe(map(user => {
        return user;
      }));
  }

  getUserById(id: string) {
    return this.http.get(this.url + "/" + id)
      .pipe(map(user => {
        return user;
      }));
  }

  getUserByUsername(username: string): Promise<any> {
    return this.http
      .get(this.url + "/username/" + username)
      .toPromise()
      .then(this.onGetUserByName.bind(this));
  }

  onGetUserByName(res: any) {
    return Promise.resolve(res);
  }

  putUser(user: User) {
    console.log(user);
    return this.http.put(this.url + "/" + user._id, user).subscribe(response => { });
    //return this.http.put(this.url + "/" + user._id, user).subscribe((res: Response) => res.json());
  }

  deleteUser(id: string) {
    return this.http.delete(this.url + "/" + id);
  }

  getUsersNoDeleted(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "/noDeleted/");
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}

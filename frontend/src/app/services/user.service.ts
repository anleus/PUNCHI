import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models/users";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DepartamentosService } from './departamentos.service';
import { forkJoin } from 'rxjs';

@Injectable()
export class UserService {
  selectedUser: User;
  users: User[];

  url: string = "";

  constructor(private http: HttpClient, private departamentosService: DepartamentosService) {
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

  putUser(user: User) {
    console.log(user);
    return this.http.put(this.url + "/" + user._id, user).subscribe(response => { });
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

  getUsersByDepartment(departamentoId: string) {
      this.departamentosService.getDepartamentoByID(departamentoId).subscribe(
        res => {
          let all_obs = [];
          if (res != null) {
            var nombreDepartamento = res["nombre"];
            var idsUsuarios = res["usuarios"];
            var numberUsers = idsUsuarios.length;
            var auxnumber = 1;
            var users = [];
            all_obs.push(
            idsUsuarios.forEach(element => {
              this.getUserById(element).subscribe(
                resp => {
                  if (resp != null) {
                    var aux;
                    aux = resp;
                    aux.deparatmento = nombreDepartamento;
                    users.push(aux);
                    if (auxnumber == numberUsers) {
                      return users;
                    }
                  }
                  auxnumber++;
  
                });
            }));
            //console.log("userservice", users);
            return users;
          }
        });
  }
}
 

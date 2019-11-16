import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacation } from '../models/Vacation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  readonly url = "http://localhost:4000/Vacation/";

  constructor(private http: HttpClient) { }

    getUserVacations = () => this.http.get('http://localhost:4000/Vacation')


    //getUserJornadas = (userid) => this.http.get(this.url + userid);


    getVacationByUsername(userid: string): Promise<any> {
    return this.http
      .get(this.url + "user/" + userid)
      .toPromise()
      .then(this.onGetVacationByName.bind(this));
    }
    onGetVacationByName(res: any) {
        return Promise.resolve(res);
    }

}
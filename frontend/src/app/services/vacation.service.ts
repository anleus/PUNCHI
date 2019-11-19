import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacation } from '../models/Vacation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  readonly url = "http://localhost:4000/vacation/";

  constructor(private http: HttpClient) { }

  getUserVacations = () => this.http.get('http://localhost:4000/vacation')

  getVacationByUsername(userid: string): Promise<any> {
    return this.http.get(this.url + "user/" + userid)
      .toPromise()
      .then(this.onGetVacationByName.bind(this));
  }

  updateVacation(userid: string, dateP : Date, daysLeft : number) {  //para hacer update se le pasa el userid, la fecha de pending y el número de días que le quedan
    return this.http.put(this.url + "user/update" + userid, {userid, daysLeft})
      .toPromise()
      .then(this.onGetVacationByName.bind(this));
  }

  onGetVacationByName(res: any) {
    return Promise.resolve(res);
  }


    public putVacationUser(userid, vacation){
      this.http.put('http://localhost:4000/vacation/user/'+userid,vacation);
    }

}
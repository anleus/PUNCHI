import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacation } from '../models/Vacation';

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

  updateVacation(_vid: string, pending : Date[], left : number, past : Date[]) {
    //console.log("cacaciones service", past)
    return this.http.post(this.url + "user/update/" + _vid, {_vid, pending, left, past})
      .subscribe(vac => { return vac;});
  }

  onGetVacationByName(res: any) {
    return Promise.resolve(res);
  }


    public putVacationUser(userid, vacation){
      return this.http.post('http://localhost:4000/vacation/user/update/' + userid,vacation);
    }

}
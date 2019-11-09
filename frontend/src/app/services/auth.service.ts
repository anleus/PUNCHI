import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '../models/users';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post(environment.urlb + `/users/username/${username}`, {username, password})
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                //this.currentUserSubject.next(user);
                return user;
            }));
    }

    getCurrentUser(){
        return this.currentUser;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        console.log("Loggin out");
        window.location.href = environment.urlf + '/login';
    }

    checkToken() {  // Chequea si hay un token, esto hay que hacerlo mejor con el Resolve
        if (localStorage.getItem("currentUser") === null) window.location.href = environment.urlf + '/login';
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/user.interface';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getLoggedInUser() {
    const loggedUserAPI = environment.videoBoxBackendUrl + '/api/users/self';
    return this.http.get<IUser>(loggedUserAPI).pipe(
      map((loggedUser) => {
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        console.log('user logged', loggedUser);
        return loggedUser;
      })
    );
  }

  getActiveLoggedUser() {
    const loggedUser = localStorage.getItem('loggedUser');

    if (loggedUser) return JSON.parse(loggedUser);
  }
}

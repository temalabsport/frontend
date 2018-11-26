import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { tap, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`/api/user/login`, { email: email, password: password }, { observe: 'response' })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    register(username: string, email: string, password: string, fullname: string) {
      return this.http.post<any>(`/api/user/register`, { userName: username, email: email, password: password, fullName: fullname });
    }

    setSession(authResponse) {
      console.log(authResponse.headers.get('x-auth-token'));
      localStorage.setItem('x-auth-token', authResponse.headers.get('x-auth-token'));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('x-auth-token');
        localStorage.removeItem('currentUser');
    }
}

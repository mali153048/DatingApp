import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5000/api/auth/'; // api url to send user name and password to

  login(model: any) {
    return this.http.post(this.baseURL + 'login', model)
      .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      }));
  }

  register(model: any) {
    return this.http.post(this.baseURL + 'register', model);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { LoginResponse, User } from '../models';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token = null;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private env: EnvService,
  ) { }


  login(payload) {
    console.log('auth.service: payload =>', payload);
    return this.http.post(this.env.API_URL + '/users/login', payload)
    .pipe(tap((response: LoginResponse) => {
        console.log('auth.service: response =>', response);
      if (response.success) {
        const { user, token } = response.payload;
        this.storage.set('user', user).then(() => {
          console.log('User Stored');
        },
          error => console.error('Error storing item user', error)
          );
        this.storage.set('token', token).then(() => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item token', error)
        );
        this.token = token;
        this.isLoggedIn = true;
      }
        this.token = null;
        this.isLoggedIn = false;
        return response;
      }),
    );
  }

  logout(): Promise<any> {
    this.isLoggedIn = false;
    delete this.token;
    return this.storage.remove('token');
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(tap(user => {
        return user;
      })
    );
  }

  getUser() {
    return this.storage.get('user').then(data => data).catch(e => null);
  }

  public async getToken(): Promise<any> {
    try {
      const token = await this.storage.get('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }
}

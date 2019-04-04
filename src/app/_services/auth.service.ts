import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';
import { User, LoginResponse, LoginPayload } from '../_models';
import { UtilsService } from './utils.service';
import { GetRoutes } from './api-routes.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    // loginUrl = `${environment.PEACE_API}/users/login`;

    constructor(private http: HttpClient,
      private router: Router,
      private utilsService: UtilsService) {
        const user = this.utilsService.getLocalStorage('user');
        if (!!user) {
            this.userSubject = new BehaviorSubject<User>(user);
            this.user = this.userSubject.asObservable();
        }
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(loginPayload: LoginPayload): Observable<LoginResponse> {
      localStorage.clear();
      console.log('\ninside Auth service', loginPayload);
      return this.http.post<LoginResponse>(`${GetRoutes.Users}/login`, loginPayload)
          .pipe(map((data: LoginResponse) => {
              console.log(data);
              if (data.success) {
                  const { user, token } = data.payload;
                  this.userSubject = new BehaviorSubject<User>(user);
                  this.user = this.userSubject.asObservable();
                  this.isLoginSubject.next(true);
                  localStorage.setItem('token', token);
                  this.utilsService.setLocalStorage('user', user, null);
                }
              return data;
          }));
    }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
    isAuthenticated(): boolean {
        if (!!localStorage.getItem('token')) {
          return true;
        } else {
          return false;
        }
      }

    /**
     * @returns {Observable<T>}
     */
    isLoggedIn(): Observable<boolean> {
      return this.isLoginSubject.asObservable();
    }

    logout() {
      this.utilsService.removeLocalStorage('token');
      this.userSubject.next(null);
      this.router.navigate(['/login']);
    }
}

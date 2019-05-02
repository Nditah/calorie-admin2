import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, ApiResponse } from '../../models';
import { ApiService } from '../../services';


@Injectable()
export class Users {
  _user: any;
  users: User[] = [];

  constructor(private apiService: ApiService) {
    const users = []; // Initial Values
    for (const user of users) {
      this.users.push(new User(user));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.users;
    }
    return this.users.filter((log) => {
      for (const key in params) {
        const field = log[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return log;
        } else if (field == params[key]) {
          return log;
        }
      }
      return null;
    });
  }
  add(log: User) {
    this.users.push(log);
  }

  delete(log: User) {
    this.users.splice(this.users.indexOf(log), 1);
  }

  // CRUD Service
  recordRetrieve(q = ''): Observable<any> {
    const subRes = this.apiService.getUser(q);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          res.payload.forEach(element => {
            this.add(element);
          });
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordCreate(data): Observable<any>  {
    const subRes = this.apiService.postUser(data);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          const rec = res.payload[0];
          this.recordRetrieve(`_id=${rec.id}`);
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordUpdate(log: User, payload): Observable<any>  {
    const subRes = this.apiService.updateUser(log.id, payload);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          const rec = res.payload[0];
          this.delete(log);
          this.recordRetrieve(`_id=${rec.id}`);
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordDelete(log: User): Observable<any>  {
    const subRes = this.apiService.deleteUser(log.id);
    subRes.subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success) {
        this.delete(log);
      } else {
        console.log(res.message);
      }
    }, (err) => throwError(err));
    return subRes;
  }

}

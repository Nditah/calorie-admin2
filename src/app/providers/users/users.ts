import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { User, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

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
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getUser(path).pipe(
    map((res: ApiResponse) => {
      console.log(res);
        if (res.success && res.payload.length > 0) {
          res.payload.forEach(element => {
            this.add(element);
          });
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }


  async recordCreate(data): Promise<ApiResponse> {
    const proRes = this.apiService.postUser(data).pipe(
    map((res: ApiResponse) => {
        if (res.success && res.payload) {
          console.log('recordCreate() successful');
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordUpdate(user: User, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateUser(user.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(user);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(user: User): Promise<ApiResponse> {
    const proRes = this.apiService.deleteUser(user.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(user);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

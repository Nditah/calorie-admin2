import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
import { GetRoutes } from './api-routes.service';

@Injectable({ providedIn: 'root' })
export class CrudService {

  token = localStorage.getItem('token');

  constructor(private utilsService: UtilsService) { }

  getApiString(apiUrl: string): string {
      let result = apiUrl;
      let a = result.indexOf('?');
      if (+a !== -1) {
        result = result.slice(0, a);
      }
      a = result.search('/api/');
      if (a !== -1) {
          result = result.slice(a + 5);
          a = result.search('/');
          if (a !== -1) {
          result = result.slice(0, a);
          }
      }
      return result.replace(/-/g, '_'); // replaces all "-" with "_"
  }

  getAuth(url: GetRoutes | string, saveData: boolean = false) {
    console.log('token is', this.token);

    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        'cache-control': 'no-cache',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (saveData && data.success) {
          // const storageName = (url.split('/').reverse())[0];
          const storageName = this.getApiString(url);
          console.log(storageName);
          if (storageName) {
          this.utilsService.setLocalStorage(storageName, data.payload, null);
          // sessionStorage.setItem(storageName, JSON.stringify(data.payload));
          }
        }
        return data;
      })
      .catch(err => Promise.reject(err.message));
  }

  get(url: GetRoutes | string, saveData: boolean = false) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (saveData && data.success) {
          const storageName = (url.split('/').reverse())[0];
          this.utilsService.setLocalStorage(storageName, data.payload, null);
          // sessionStorage.setItem(storageName, JSON.stringify(data.payload));
        }
        return data;
      })
      .catch(err => Promise.reject(err.message));
  }

  post(url: GetRoutes | string, payload = {}) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(this.utilsService.cleanObject(payload)),
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }

  put(url: GetRoutes | string, payload = {}) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'cache-control': 'no-cache',
      },
      body: JSON.stringify(this.utilsService.cleanObject(payload)),
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }

  delete(url: GetRoutes | string) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        'cache-control': 'no-cache',
      },
    })
      .then(res => res.json())
      .catch(err => Promise.reject(err.message));
  }
}


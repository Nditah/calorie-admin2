import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { ApiService } from '../../services';
import { Setting, ApiResponse } from '../../models';


@Injectable()
export class Settings {

  settings: Setting[] = [];

  constructor(private apiService: ApiService) {
    const settings = []; // Initial Values
    for (const setting of settings) {
      this.settings.push(new Setting(setting));
    }
    this.recordRetrieve();
  }

    // CRUD Service
    recordRetrieve(q = ''): Observable<any> {
      const subRes = this.apiService.getSetting(q);
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

    recordUpdate(setting: Setting, payload): Observable<any>  {
      const subRes = this.apiService.updateSetting(setting.id, payload);
      subRes.subscribe((res: ApiResponse) => {
            console.log(res);
          if (res.success && res.payload.length > 0) {
            const rec = res.payload[0];
            this.delete(setting);
            this.recordRetrieve(`_id=${rec.id}`);
          } else {
            console.log(res.message);
          }
        }, (err) => throwError(err));
        return subRes;
    }


  query(params?: any) {
    if (!params) {
      return this.settings;
    }
    return this.settings.filter((setting) => {
      for (const key in params) {
        const field = setting[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return setting;
        } else if (field == params[key]) {
          return setting;
        }
      }
      return null;
    });
  }
  add(setting: Setting) {
    this.settings.push(setting);
  }

  delete(setting: Setting) {
    this.settings.splice(this.settings.indexOf(setting), 1);
  }

}

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Setting, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

@Injectable()
export class Settings {

  settings: Setting[] = [];

  defaultRecord: Setting = {
    id: '1',
    name: 'AppName',
    access: 'public',
    value: 'Afro-Calorie',
    category: 'App',
    description: 'App Name',
  };

  constructor(private apiService: ApiService) {
    const settings = []; // Initial Values
    for (const setting of settings) {
      this.settings.push(new Setting(setting));
    }
    this.recordRetrieve();
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
    console.log('Array length before push', this.settings.length);
    this.settings.push(setting);
    console.log('Array length after push', this.settings.length);
    console.log('record added to ecercise', setting);
  }

  delete(setting: Setting) {
    this.settings.splice(this.settings.indexOf(setting), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getSetting(path).pipe(
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

  async recordUpdate(setting: Setting, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateSetting(setting.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(setting);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

}

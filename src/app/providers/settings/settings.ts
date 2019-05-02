import { Injectable } from '@angular/core';
import { ApiService, UtilsService } from '../../services';
import { Nutrient, ApiResponse } from '../../models';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Settings {
  private SETTINGS_KEY: string = '_settings';

  settings: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public utilsService: UtilsService, defaults: any) {
    this._defaults = defaults;
  }

  load() {
    return this.utilsService.getLocalStorage(this.SETTINGS_KEY).then((value) => {
      if (value) {
        this.settings = value;
        return this._mergeDefaults(this._defaults);
      } else {
         if (this.setAll(this._defaults)) {
          return ; // this.settings = val;
        }
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.settings)) {
        this.settings[k] = defaults[k];
      }
    }
    return this.setAll(this.settings);
  }

  merge(settings: any) {
    for (let k in settings) {
      this.settings[k] = settings[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.settings[key] = value;
    return this.utilsService.setLocalStorage(this.SETTINGS_KEY, this.settings, null);
  }

  setAll(value: any) {
    return this.utilsService.setLocalStorage(this.SETTINGS_KEY, value, null);
  }

  getValue(key: string) {
    return this.utilsService.getLocalStorage(this.SETTINGS_KEY)
      .then(settings => {
        return settings[key];
      });
  }

  save() {
    return this.setAll(this.settings);
  }

  get allSettings() {
    return this.settings;
  }
}

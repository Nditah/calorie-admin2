import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class UtilsService {

  depth = 0;
  constructor(private datePipe: DatePipe) { }

  isLoaded(loading: boolean): boolean {
    return loading === false;
  }

  eventDates(start, end): string {
    // Display single-day events as "Jan 7, 2018"
    // Display multi-day events as "Aug 12, 2017 - Aug 13, 2017"
    const startDate = this.datePipe.transform(start, 'mediumDate');
    const endDate = this.datePipe.transform(end, 'mediumDate');
    if (startDate === endDate) {
      return startDate;
    } else {
      return `${startDate} - ${endDate}`;
    }
  }

  eventDatesTimes(start, end): string {
    // Display single-day events as "1/7/2018, 5:30 PM - 7:30 PM"
    // Display multi-day events as "8/12/2017, 8:00 PM - 8/13/2017, 10:00 AM"
    const _shortDate = 'M/d/yyyy';
    const startDate = this.datePipe.transform(start, _shortDate);
    const startTime = this.datePipe.transform(start, 'shortTime');
    const endDate = this.datePipe.transform(end, _shortDate);
    const endTime = this.datePipe.transform(end, 'shortTime');
    if (startDate === endDate) {
      return `${startDate}, ${startTime} - ${endTime}`;
    } else {
      return `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
    }
  }

  eventPast(eventEnd): boolean {
    // Check if event has already ended
    const now = new Date();
    const then = new Date(eventEnd.toString());
    return now >= then;
  }

  hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  cleanObject(obj) {
    this.depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (this.depth <= 3) {
              this.cleanObject(obj[ propName ]);
            }
        }
    }
    return obj;
  }

 setLocalStorage(name, value, expires) {
      if (expires === undefined || expires === null) {
          expires = (24 * 60 * 60 * 1000); // 1day
      } else {
          expires = Math.abs(expires);
      }

      const now = Date.now(); // in Miliseconds
      const schedule = now + expires;
      try {
          this.removeLocalStorage(name);
          if (typeof value === 'string' || typeof value === 'number') {
              window.localStorage.setItem(name, `${value}`);
          } else {
              window.localStorage.setItem(name, JSON.stringify(value));
          }
          window.localStorage.setItem(`${name}_expiresIn`, schedule.toString());
          return true;
      } catch (domException) {
        if (domException.name === 'QuotaExceededError' ||
            domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            console.log('LocalStorage quata exceeded. Clear your browser');
        } else {
          console.log('Error: ' + domException);
        }
        return false;
      }
  }

 getLocalStorage(name: string) {
      const now = Date.now();

      let expiresIn: number = parseInt(window.localStorage.getItem(`${name}_expiresIn`), 10);
      if (expiresIn === undefined || expiresIn === null) {
          expiresIn = 0;
      }

      if (expiresIn < now) {
          this.removeLocalStorage(name);
          return null;
      } else {
          if (this.propsExist(name, window.localStorage)) {
              const getItem = window.localStorage.getItem(name);
              try {
                  return JSON.parse(getItem);
              } catch (e) {
                  return getItem;
              }
          } else {
              return false;
          }
      }
  }

 removeLocalStorage(name) {
      try {
          window.localStorage.removeItem(name);
          window.localStorage.removeItem(`${name}_expiresIn`);
      } catch (e) {
          console.log('Error: ', e);
          return false;
      }
      return true;
  }

 nextDate(d = 1) {
      return new Date(new Date().setDate(new Date().getDate() + d));
  }

 getStringDate(dateObject) {
      if (this.propsExist('year', dateObject) &&
        this.propsExist('month', dateObject) &&
        this.propsExist('day', dateObject)) {
          return `${dateObject['year']}-${dateObject['month']}-${dateObject['day']}`;
      }
      return false;
  }
/*
 formatMoney(n, c, d, t) {
      let c = isNaN(c = Math.abs(c)) ? 2 : c,
          d = d == undefined ? '.' : d,
          t = t == undefined ? ',' : t,
          s = n < 0 ? '-' : '',
          i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
          j = (j = i.length) > 3 ? j % 3 : 0;

      return s + (j ? i.substr(0, j) + t : '') +
       i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
        (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  }
*/
 propsExist(name, objectData) {
      return Object.prototype.hasOwnProperty.call(objectData, name);
  }

  /**
 * @description getObjectByKey returns the object from an Array of
 * Objects that has the key with a given value or undefined!
 * @param {Array} arrObj Array of Objects
 * @param {String} key Object key could be a String or Integer
 * @param {String} value Object value could be a String or Integer
 */
  getObjectByKey(arrObj= [], key: string, value: string) {
    return arrObj.find(obj => obj[ key ] === value);
  }

  /**
   * @description function removes from an array of objects,
   * one object given by a (unique) key and a value
   */
  deleteObjectByKey(arrObj= [], key: string, value: string) {
    const removeIndex = arrObj.map(function(item) { return item[key]; }).indexOf(value);
    arrObj.splice(removeIndex, 1);
  }

  getSettings(arrObj= [], value: string){
    const Obj = arrObj.find(item => item.name === value);
    const result = Obj.value;
    return result;
  }
}

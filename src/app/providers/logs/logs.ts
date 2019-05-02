import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Log, Food, ApiResponse } from '../../models';
import { ApiService } from '../../services';

@Injectable()
export class Logs {

  logs: Log[] = [];

  food: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Bread',
    description: 'Wheat bread enrich with vitamins A,B,C',
    calories: 2300,
    image: 'assets/img/bread.jpg',
  };

  exercise: any = {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calorie_rate: '2300',
    image: 'assets/img/football.png',
  };

  defaultRecord: Log = {
    id: '1',
    day: new Date(),
    food: this.food,
    food_quantity: 1200,
    exercise: this.exercise,
    exercise_duration: 20,
    current_mass: 97,
    remark: 'Making progress',
  };


  constructor(private apiService: ApiService) {
    const logs = []; // Initial Values
    for (const log of logs) {
      this.logs.push(new Log(log));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.logs;
    }
    return this.logs.filter((log) => {
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
  add(log: Log) {
    this.logs.push(log);
  }

  delete(log: Log) {
    this.logs.splice(this.logs.indexOf(log), 1);
  }

  // CRUD Service
  recordRetrieve(q = ''): Observable<any> {
    const subRes = this.apiService.getLog(q);
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
    const subRes = this.apiService.postLog(data);
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

  recordUpdate(log: Log, payload): Observable<any>  {
    const subRes = this.apiService.updateLog(log.id, payload);
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

  recordDelete(log: Log): Observable<any>  {
    const subRes = this.apiService.deleteLog(log.id);
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

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Log, Food, Exercise, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

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

  exercise: Exercise = {
    id: '1',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calorie_rate: 2300,
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
    console.log('Array length before push', this.logs.length);
    this.logs.push(log);
    console.log('Array length after push', this.logs.length);
    console.log('record added to ecercise', log);
  }

  delete(log: Log) {
    this.logs.splice(this.logs.indexOf(log), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getLog(path).pipe(
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
    const proRes = this.apiService.postLog(data).pipe(
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

  async recordUpdate(log: Log, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateLog(log.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(log);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(log: Log): Promise<ApiResponse> {
    const proRes = this.apiService.deleteLog(log.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(log);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

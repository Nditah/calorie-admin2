import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Food, ApiResponse } from '../../models';
import { ApiService } from '../../services';

@Injectable()
export class Foods {

  foods: Food[] = [];

  defaultRecord: Food = {
    id: '1',
    type: 'DEFAULT',
    category: 'FOOD',
    name: 'Bread',
    description: 'Whole wheat bread with added vitamins and minerals',
    water: 0.4,
    calories: 23400,
    carbohydrate: 2345,
    protein: 2500,
    fats: 230.0,
    fibre: 3570,
    minivites: [{ minivite_id: '5cbb581b42b32d642a7c32f5', minivite_value: 120 }],
    image: 'assets/images/junk.jpg',
  };


  constructor(private apiService: ApiService) {
    const foods = []; // Initial Values
    for (const food of foods) {
      this.foods.push(new Food(food));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.foods;
    }
    return this.foods.filter((food) => {
      for (const key in params) {
        const field = food[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return food;
        } else if (field == params[key]) {
          return food;
        }
      }
      return null;
    });
  }
  add(food: Food) {
    this.foods.push(food);
  }

  delete(food: Food) {
    this.foods.splice(this.foods.indexOf(food), 1);
  }

  // CRUD Service
  recordRetrieve(q = ''): Observable<any> {
    const subRes = this.apiService.getFood(q);
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
    const subRes = this.apiService.postFood(data);
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

  recordUpdate(food: Food, payload): Observable<any>  {
    const subRes = this.apiService.updateFood(food.id, payload);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          const rec = res.payload[0];
          this.delete(food);
          this.recordRetrieve(`_id=${rec.id}`);
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordDelete(food: Food): Observable<any>  {
    const subRes = this.apiService.deleteFood(food.id);
    subRes.subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success) {
        this.delete(food);
      } else {
        console.log(res.message);
      }
    }, (err) => throwError(err));
    return subRes;
  }

}



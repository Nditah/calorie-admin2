import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Food, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

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
    console.log('Array length before push', this.foods.length);
    this.foods.push(food);
    console.log('Array length after push', this.foods.length);
    console.log('record added to ecercise', food);
  }

  delete(food: Food) {
    this.foods.splice(this.foods.indexOf(food), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getFood(path).pipe(
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
    const proRes = this.apiService.postFood(data).pipe(
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

  async recordUpdate(food: Food, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateFood(food.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(food);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(food: Food): Promise<ApiResponse> {
    const proRes = this.apiService.deleteFood(food.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(food);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

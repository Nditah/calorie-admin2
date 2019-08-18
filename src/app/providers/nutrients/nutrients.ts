import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Nutrient, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

@Injectable()
export class Nutrients {

  nutrients: Nutrient[] = [];

  defaultRecord: Nutrient =  {
      id: '1',
      name: 'Water',
      classification: 'water',
      type: 'main',
      symbol: 'H2O',
      limit: 10000000,
      unit: 'mg',
      category: 'class',
      deficiency: '',
      excess: '',
      ear: 20000000,
      rda_male: 20000000,
      rda_female: 20000000,
      image: 'bread.jpg',
      source: 'A large proportion of the water is taken in the form of beverages, wines, beer,succulent fruits and vegetables, or in milk',
      use: 'It forms the chief ingredient of all the fluids of the body and maintains their proper degree of dilution. Lukewarm water acts as an emetic if drunk in large quantity. ',
      description: 'Water’s involved in every type of cellular process in your body, and when you’re dehydrated, they all run less efficiently -- and that includes your metabolism. ',
  };


  constructor(private apiService: ApiService) {
    const nutrients = []; // Initial Values
    for (const nutrient of nutrients) {
      this.nutrients.push(new Nutrient(nutrient));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.nutrients;
    }
    return this.nutrients.filter((nutrient) => {
      for (const key in params) {
        const field = nutrient[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return nutrient;
        } else if (field == params[key]) {
          return nutrient;
        }
      }
      return null;
    });
  }
  add(nutrient: Nutrient) {
    console.log('Array length before push', this.nutrients.length);
    this.nutrients.push(nutrient);
    console.log('Array length after push', this.nutrients.length);
    console.log('record added to ecercise', nutrient);
  }

  delete(nutrient: Nutrient) {
    this.nutrients.splice(this.nutrients.indexOf(nutrient), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getNutrient(path).pipe(
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
    const proRes = this.apiService.postNutrient(data).pipe(
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

  async recordUpdate(nutrient: Nutrient, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateNutrient(nutrient.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(nutrient);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(nutrient: Nutrient): Promise<ApiResponse> {
    const proRes = this.apiService.deleteNutrient(nutrient.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(nutrient);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

// http://www.medic8.com/healthguide/articles/foodgroups.html
// https://www.webmd.com/food-recipes/guide/vitamins-and-minerals-good-food-sources

import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Exercise, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

@Injectable()
export class Exercises {

  exercises: Exercise[] = [];

  defaultRecord: any = {
    id: '5051bc91860d8b5050000001',
    type: 'DEFAULT',
    category: 'SPORT',
    name: 'Football',
    description: 'Favourite sport for cutting down fats for teens and adults',
    calorie_rate: '2300',
    image: 'assets/images/football.png',
  };

  constructor(private apiService: ApiService) {
    const exercises = []; // Initial Values
    for (const exercise of exercises) {
      this.exercises.push(new Exercise(exercise));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.exercises;
    }
    return this.exercises.filter((exercise) => {
      for (const key in params) {
        const field = exercise[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return exercise;
        } else if (field == params[key]) {
          return exercise;
        }
      }
      return null;
    });
  }
  add(exercise: Exercise) {
    console.log('Array length before push', this.exercises.length);
    this.exercises.push(exercise);
    console.log('Array length after push', this.exercises.length);
    console.log('record added to ecercise', exercise);
  }

  delete(exercise: Exercise) {
    this.exercises.splice(this.exercises.indexOf(exercise), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getExercise(path).pipe(
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
    const proRes = this.apiService.postExercise(data).pipe(
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

  async recordUpdate(exercise: Exercise, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateExercise(exercise.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(exercise);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(exercise: Exercise): Promise<ApiResponse> {
    const proRes = this.apiService.deleteExercise(exercise.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(exercise);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

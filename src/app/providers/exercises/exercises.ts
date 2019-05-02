import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Exercise, ApiResponse } from '../../models';
import { ApiService } from '../../services';

@Injectable()
export class Exercises {

  exercises: Exercise[] = [];

  defaultRecord: any = {
    id: '1',
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
    this.exercises.push(exercise);
  }

  delete(exercise: Exercise) {
    this.exercises.splice(this.exercises.indexOf(exercise), 1);
  }

  // CRUD Service
  recordRetrieve(q = ''): Observable<any> {
    const subRes = this.apiService.getExercise(q);
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
    const subRes = this.apiService.postExercise(data);
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

  recordUpdate(exercise: Exercise, payload): Observable<any>  {
    const subRes = this.apiService.updateExercise(exercise.id, payload);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          const rec = res.payload[0];
          this.delete(exercise);
          this.recordRetrieve(`_id=${rec.id}`);
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordDelete(exercise: Exercise): Observable<any>  {
    const subRes = this.apiService.deleteExercise(exercise.id);
    subRes.subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success) {
        this.delete(exercise);
      } else {
        console.log(res.message);
      }
    }, (err) => throwError(err));
    return subRes;
  }

}

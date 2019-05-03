import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Feedback, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

@Injectable()
export class Feedbacks {

  feedbacks: Feedback[] = [];

  defaultRecord: Feedback = {
    id: '1',
    message: 'Vitamin C is helpful for...',
    status: 'read',
  };

  constructor(private apiService: ApiService) {
    const feedbacks = []; // Initial Values
    for (const feedback of feedbacks) {
      this.feedbacks.push(new Feedback(feedback));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.feedbacks;
    }
    return this.feedbacks.filter((feedback) => {
      for (const key in params) {
        const field = feedback[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return feedback;
        } else if (field == params[key]) {
          return feedback;
        }
      }
      return null;
    });
  }
  add(feedback: Feedback) {
    console.log('Array length before push', this.feedbacks.length);
    this.feedbacks.push(feedback);
    console.log('Array length after push', this.feedbacks.length);
    console.log('record added to ecercise', feedback);
  }

  delete(feedback: Feedback) {
    this.feedbacks.splice(this.feedbacks.indexOf(feedback), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getFeedback(path).pipe(
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
    const proRes = this.apiService.postFeedback(data).pipe(
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

  async recordUpdate(feedback: Feedback, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateFeedback(feedback.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(feedback);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(feedback: Feedback): Promise<ApiResponse> {
    const proRes = this.apiService.deleteFeedback(feedback.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(feedback);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Feedback, ApiResponse } from '../../models';
import { ApiService } from '../../services';

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
    this.feedbacks.push(feedback);
  }

  delete(feedback: Feedback) {
    this.feedbacks.splice(this.feedbacks.indexOf(feedback), 1);
  }

  // CRUD Service
  recordRetrieve(q = ''): Observable<any> {
    const subRes = this.apiService.getFeedback(q);
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
    const subRes = this.apiService.postFeedback(data);
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

  recordUpdate(feedback: Feedback, payload): Observable<any>  {
    const subRes = this.apiService.updateFeedback(feedback.id, payload);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          const rec = res.payload[0];
          this.delete(feedback);
          this.recordRetrieve(`_id=${rec.id}`);
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordDelete(feedback: Feedback): Observable<any>  {
    const subRes = this.apiService.deleteFeedback(feedback.id);
    subRes.subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success) {
        this.delete(feedback);
      } else {
        console.log(res.message);
      }
    }, (err) => throwError(err));
    return subRes;
  }

}

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Image, Food, ApiResponse } from '../../models';
import { ApiService } from '../../services';

@Injectable()
export class Images {

  images: Image[] = [];

  defaultRecord: Image = {
    id: '1',
    name: 'ball',
    url: 'https://dhhf/ball.jpg',
  };


  constructor(private apiService: ApiService) {
    const images = []; // Initial Values
    for (const image of images) {
      this.images.push(new Image(image));
    }
    this.recordRetrieve();
  }

  query(params?: any) {
    if (!params) {
      return this.images;
    }
    return this.images.filter((image) => {
      for (const key in params) {
        const field = image[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return image;
        } else if (field == params[key]) {
          return image;
        }
      }
      return null;
    });
  }
  add(image: Image) {
    this.images.push(image);
  }

  delete(image: Image) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  // CRUD Service
  recordRetrieve(q = ''): Observable<any> {
    const subRes = this.apiService.getImage(q);
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
    const subRes = this.apiService.postImage(data);
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

  recordUpdate(image: Image, payload): Observable<any>  {
    const subRes = this.apiService.updateImage(image.id, payload);
    subRes.subscribe((res: ApiResponse) => {
          console.log(res);
        if (res.success && res.payload.length > 0) {
          const rec = res.payload[0];
          this.delete(image);
          this.recordRetrieve(`_id=${rec.id}`);
        } else {
          console.log(res.message);
        }
      }, (err) => throwError(err));
      return subRes;
  }

  recordDelete(image: Image): Observable<any>  {
    const subRes = this.apiService.deleteImage(image.id);
    subRes.subscribe((res: ApiResponse) => {
        console.log(res);
      if (res.success) {
        this.delete(image);
      } else {
        console.log(res.message);
      }
    }, (err) => throwError(err));
    return subRes;
  }

}

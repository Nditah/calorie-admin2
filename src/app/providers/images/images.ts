import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { Image, ApiResponse } from '../../models';
import { ApiService } from '../../services';
import { map } from 'rxjs/operators';

@Injectable()
export class Images {

  images: Image[] = [];

  defaultRecord: Image = {
    id: '1',
    name: 'Juice',
    url: 'juince.png',
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
    console.log('Array length before push', this.images.length);
    this.images.push(image);
    console.log('Array length after push', this.images.length);
    console.log('record added to ecercise', image);
  }

  delete(image: Image) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  // CRUD Service
  async recordRetrieve(path = ''): Promise<ApiResponse> {
    const proRes = this.apiService.getImage(path).pipe(
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

  // uploadImage
  async recordCreate(image: File, name: string): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    const proRes = this.apiService.postImage(formData).pipe(
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

  async recordUpdate(image: Image, payload): Promise<ApiResponse> {
    const proRes = this.apiService.updateImage(image.id, payload).pipe(
    map((res: ApiResponse) => {
        if (res.success) {
          this.delete(image);
        } else {
          throwError(res.message);
        }
        return res;
      }));
      return await proRes.toPromise();
  }

  async recordDelete(image: Image): Promise<ApiResponse> {
    const proRes = this.apiService.deleteImage(image.id).pipe(
    map((res: ApiResponse) => {
      if (res.success) {
        this.delete(image);
      } else {
        throwError(res.message);
      }
      return res;
    }));
    return await proRes.toPromise();
  }

}

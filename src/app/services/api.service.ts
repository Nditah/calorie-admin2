import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EnvService } from './env.service';
import { ApiResponse, Log } from '../models';


const API_STORAGE_KEY = 'specialkey';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  depth = 0;

  constructor(private http: HttpClient,
    private env: EnvService,
    private router: Router) { }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened; please try again later.');
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    //throwError(error);
    console.log('Something bad happened; please try again later.');
    return throwError(error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  cleanObject(obj) {
    this.depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (this.depth <= 3) {
              this.cleanObject(obj[ propName ]);
            }
        }
    }
    return obj;
  }

  getImageUrl(str: string) {
    return `${this.env.API_URL}/assets/images/${str}`;
  }

  // /////////////////////////////////
  // ----------FOOD-----------------//
  // /////////////////////////////////

  getFood(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/foods${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFood(data): Observable<any> {
    const url = `${this.env.API_URL}/foods`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFood(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/foods/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteFood(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/foods/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------FEEDBACK-----------------//
  // /////////////////////////////////

  getFeedback(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/notifications${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFeedback(data): Observable<any> {
    const url = `${this.env.API_URL}/notifications`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFeedback(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/notifications/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteFeedback(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/notifications/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------EXERCISE-------------//
  // /////////////////////////////////

  getExercise(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/exercises${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postExercise(data) {
    const url = `${this.env.API_URL}/exercises`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateExercise(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/exercises/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteExercise(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/exercises/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------LOG-------------//
  // /////////////////////////////////

  getLog(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/logs${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postLog(data: Log): Observable<any> {
    const url = `${this.env.API_URL}/logs`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateLog(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/logs/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteLog(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/logs/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------IMAGE-------------//
  // /////////////////////////////////


  // getImageUrl(str: string) {
  //   return `${this.env.API_URL}/assets/images/${str}`;
  // }


  getImage(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/images${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  public postImage(data: any): Observable<any> {
    const headers = new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      });
    const url = `${this.env.API_URL}/images`;
    return this.http.post<any>(url, data, { headers, observe: 'events', reportProgress: true })
    .pipe(map((event) => {
      console.log(event);
      /*
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }*/
    })
    );
  }

  deleteImage(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/images/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------NUTRIENTS------------//
  // /////////////////////////////////

  getNutrient(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/nutrients${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postNutrient(data): Observable<any> {
    const url = `${this.env.API_URL}/nutrients`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateNutrient(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/nutrients/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteNutrient(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/nutrients/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------SETUP -------------//
  // /////////////////////////////////

  postSetup(data, path = ''): Observable<any> {
    const url = `${this.env.API_URL}/setups${path}`;
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  getSetup(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/setups${path}`;
    return this.http.get(url).pipe(
        catchError(this.handleError)
      );
  }

  downloadCsv(fileName: string): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(`${this.env.API_URL}/setups/csv/${fileName}`, options);
  }

  uploadCsv(data: any, fileName: string) {
    const options = { responseType: 'blob' as 'json' };
    return this.http.post(`${this.env.API_URL}/setups/csv/${fileName}`, data);
  }

  // /////////////////////////////////
  // ----------SETTING-------------//
  // /////////////////////////////////

  getSetting(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/settings${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updateSetting(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/settings/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  // /////////////////////////////////
  // ----------USER-----------------//
  // /////////////////////////////////

  getUser(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/users${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postUser(data): Observable<any> {
    const url = `${this.env.API_URL}/users`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/users/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/users/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }
}

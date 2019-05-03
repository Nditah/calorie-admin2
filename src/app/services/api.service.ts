import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EnvService } from './env.service';
import { UtilsService } from './utils.service';

import { Log } from '../models';

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
    private utilsService: UtilsService,
    private env: EnvService,
    private router: Router) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
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


  // /////////////////////////////////
  // ----------FOOD-----------------//
  // /////////////////////////////////

  getFood(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/foods?${path}`;
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
    const url = `${this.env.API_URL}/feedbacks?${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postFeedback(data): Observable<any> {
    const url = `${this.env.API_URL}/feedbacks`;
    const payload = this.cleanObject(data);
    return this.http.post(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  updateFeedback(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/feedbacks/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
      );
  }

  deleteFeedback(id: string): Observable<{}> {
    const url = `${this.env.API_URL}/feedbacks/${id}`;
    return this.http.delete(url, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  // /////////////////////////////////
  // ----------EXERCISE-------------//
  // /////////////////////////////////

  getExercise(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/exercises?${path}`;
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
    const url = `${this.env.API_URL}/logs?${path}`;
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


  getImageUrl(str: string) {
    return `${this.env.API_URL}/assets/images/${str}`;
  }


  getImage(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/images?${path}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postImage(data): Observable<any> {
    const url = `${this.env.API_URL}/images`;
    return this.http.post(url, data, httpOptions).pipe(
        catchError(this.handleError)
      );
  }


  updateImage(id: string, data): Observable<any> {
    const url = `${this.env.API_URL}/images/${id}`;
    const payload = this.cleanObject(data);
    return this.http.put(url, payload, httpOptions).pipe(
        catchError(this.handleError)
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
    const url = `${this.env.API_URL}/nutrients?${path}`;
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
  // ----------SETTING-------------//
  // /////////////////////////////////

  getSetting(path = ''): Observable<any> {
    const url = `${this.env.API_URL}/settings?${path}`;
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
    const url = `${this.env.API_URL}/users?${path}`;
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

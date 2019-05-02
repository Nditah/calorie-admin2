import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {

  constructor(private utilsService: UtilsService) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const promise = this.utilsService.getLocalStorage('token');
      const observableFromPromise =  from(promise);

      return observableFromPromise.pipe(mergeMap((token: any) => {
              const clonedReq = this.addToken(request, token);
              return next.handle(clonedReq).pipe(
                  catchError(error => {
                      throw new Error(error);                  })
              );
          }));
  }

  // Adds the token to your headers if it exists
  private addToken(request: HttpRequest<any>, token: any) {
      if (token) {
          let clone: HttpRequest<any>;
          clone = request.clone({
              setHeaders: {
                  Accept: `application/json`,
                  'Content-Type': `application/json`,
                  Authorization: `Bearer ${token}`
              }
          });
          return clone;
      }

      return request;
  }
}


/*
// Simple approach!
    export class TokenInterceptor implements HttpInterceptor {

    constructor(public _storage: Storage) {
         _storage.get('myToken').then((val) => {
         console.log('Your age is', val);
         });
    }

       intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const changedReq = req.clone({headers: req.headers.set('Authorization', this.val)});
            return next.handle(changedReq);
        }

    }

    */
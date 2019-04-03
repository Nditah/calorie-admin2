import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from '../_services';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private utilsService: UtilsService) {
      // alert('here');
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('token');
      if (!!token) {
        request = request.clone({
          setHeaders: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`,
            'cache-control': 'no-cache',
          }
        });
        console.log('\n================request ===================\n');
        console.log(request);
        console.log('\n================request ===================\n');
      }
      return next.handle(request);
    }
}

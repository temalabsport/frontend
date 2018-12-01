import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const url = 'http://sport-temalabor.azurewebsites.net';
      req = req.clone({
        url: url + req.url
      });

      const idToken = localStorage.getItem('x-auth-token');

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('x-auth-token', idToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    return next.handle(req);
  }
}

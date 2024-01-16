import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isAuthRequired(url: string): boolean {
    // Define logic to determine if auth is required for the given URL
    return url.startsWith('http://jovana');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuthRequired(req.url)) {
      const token = localStorage.getItem('token');
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(cloned);
      }
    }
    return next.handle(req);
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                const applicationError = error.headers.get('Application-error');
                if (applicationError) {
                    console.error(applicationError);
                    return throwError(applicationError);
                }
                const serverError = error.error;
                let modalsStateError = '';
                if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                        if (serverError[key]) {
                            modalsStateError += serverError[key] + '\n';
                        }
                    }
                }
                return throwError(modalsStateError || serverError || 'Server Error');
            }
        }));
    }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable, from, empty } from 'rxjs';

import { LoginComponent } from './login.component';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: LoginComponent) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    const user = await this.auth.getUser();

    if (user && !user.expired) {

      request = request.clone({
        setHeaders: {
          'Authorization': `${user.token_type} ${user.access_token}`
        }
      });
    }

    const promisse = next.handle(request).toPromise();

    promisse.catch((error) => {

      let messages = '';

      if (error.status === 404) {
        console.error(error.message);
        return;
      }

      if (error.status === 401) {
        messages += 'Acesso não authorizado. Sem permissões para acessar esse recurso' + '<br/>';
        messages += 'Verifique os logs da aplicação para maiores detalhes.';

        console.error(messages);
        return;
      }

      for (let i = 0; i < error.error.details.length; i++) {
        messages += error.error.details[i].message + '<br/>';
      }

      if (error.status === 500) {
        messages += error.error.message + '<br/>';
        messages += 'Verifique os logs da aplicação para maiores detalhes.';
      }

      console.error(messages);

      return empty();
    });

    return promisse;
  }

}

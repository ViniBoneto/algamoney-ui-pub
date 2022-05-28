import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

/* 19.11. Interceptando chamadas HTTP para tratar a expiração do access token:

  Interceptando requisições HTTP
    Como estamos utilizando o módulo HttpClient, temos uma maior flexibilidade para realizar determinadas
      tarefas, e uma dessas é a interceptação.

    Podemos, ao invés de criar um Wrapper das chamadas, e fornecer uma nova instância do objeto http, podemos
      simplesmente criar uma classe que é um interceptador. Para isso, precisaremos, criar um arquivo que podemos
      chamar de money-http-interceptor.ts, dentro do módulo segurança. O arquivo é criado com o comando
        ng g interceptor seguranca/money-http --skip-tests

    Depois, implementamos a interface HttpInterceptor do pacote '@angular/common/http' e sobrescrevemos o método
      intercept. */
@Injectable()
export class MoneyHttpInterceptor implements HttpInterceptor {

  // Vamos precisar injetar nosso AuthService.
  constructor(private auth: AuthService) {}

/* O que o método intercept faz?
    Primeiramente fazemos duas validações, uma pra saber se não estamos nos referindo ao path "/oauth/token"
      e outra para sabermos se o nosso token está inválido.

    Se o path for /oauth/token
      Neste caso, estamos fazendo uma busca por um token válido, o que significa que nosso token atual já foi
        invalidado. Se não validarmos o request para este path, entraremos em um loop infinito.

    Se o token está inválido
      Aqui checamos se nosso token está inválido, e se estiver, precisamos obter um novo, através do "/oauth/token".

    Se essas duas validações passarem, precisamos obter um novo access token antes de realizarmos a chamada
      ao nosso backend.

    Utilizamos o operador "from" para que possamos transformar nossa Promise (retornada pelo método "obterNovoAccessToken")
      em um Observable, que é o tipo de retorno esperado pelo intercept.

    Utilizamos o método "pipe" do Observable que irá nos ajudar a encadear outras operações neste mesmo Observable.
      Dentro do método "pipe", usamos um outro operador chamadao "mergeMap", ele fará a "junção" dos dois Observable,
      o primeiro é o método "obterNovoAccessToken" e o segundo será o nosso retorno, que vem de "handle.next(req)".

    Com isso, aguardamos o retorno do método "obterNovoAccessToken" e podemos adicionar o Header Authorization,
      obtendo-o do localStorage. E por fim, chamamos a requisição original.

    Caso o token esteja válido ou se estivermos de fato fazendo uma requisição para /oauth/token, apenas redirecionamos
      para a requisição original. */
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.includes('/oauth/token') && this.auth.isAccessTokenInvalido()) {
      return from(this.auth.obterNovoAccessToken())
        .pipe(
          mergeMap(() => {
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${this.auth.accessToken}`
              }
            });

            return next.handle(req);
          })
        );
    }

    return next.handle(req);
  }
}

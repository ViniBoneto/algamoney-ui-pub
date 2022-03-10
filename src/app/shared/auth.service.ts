import { Injectable } from '@angular/core';

import { oauth2Token } from '../app.component';
import { gerarFormData } from './shared.module';

/* 17.20. Implementando o serviço de cadastro de lançamentos:
  Criando serv c/ funcs q retornam o access token oauth2 p/ os servs da app q o requerem. Isto poupará o trab
  de ter q copiar e colar o token do Postman p/ os servs.

  Mantém o último token válido obtido na var oauth2Token. Se este for ainda válido retorna-o,
  senão obtém outro. */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // oauth2Token = "RecebeAlgumoauth2TokenValido";
  // var oauth2Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQ1NDc4ODE3LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJkYWNmZTJjOC1mMWNhLTQwZGYtYmNjYS1mOWQ5ZjYxOGJjNWMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.k2STPe36mB2TODBcIK4IO0vYKD2bEH9ZShAi5Uuwc28";

  /* 17.20. Implementando o serviço de cadastro de lançamentos:
      Transferindo a prop oauth2Token do serv de auth p/ o comp raiz (AppComponent), p/, c/ isto, o seu estado
      ser mantido ao longo da app, até ser alterado programaticamente. */
  oauth2Token = oauth2Token;
  basicToken = "YW5ndWxhcjpAbmd1bEByMA==";
  primeiraVez = true;

  constructor() { }

  obterOauth2AccessToken(): string {

    if(this.primeiraVez) {
      this.primeiraVez = false;

      this.__obterOauth2AccessToken(
        "http://localhost:8080/categorias",
        this.oauth2Token,
        "h").then(resp => {
          console.log("Resposta (array de objetos Response):\n", resp);

          if(!resp[0].ok && resp[0].status === 401) {
            return "resolved";
          }
          else
            throw new Error(`Response retornou c/ seguinte erro: ${resp[0].status} - ${resp[0].statusText}`);
      }).then(() => {
          return this.__obterOauth2AccessToken(
            "http://localhost:8080/oauth/token",
            this.basicToken,
            "p",
            false,
            undefined,
            // OAuth2 body params
            gerarFormData({
              "client": "angular",
              "username": "admin@algamoney.com",
              "password": "admin",
              "grant_type": "password"
            })
          );
      }).then(async resp => {
        console.log("Resposta (array de objetos Response):\n", resp);
        let respBody = await resp[0].json();
        console.log("Corpo da resposta como JSON (1º objeto Response retornado):\n", /* resp[0].json() */respBody);
        // let respBody = await resp[0].text();
        // console.log("Corpo da resposta como texto (1º objeto Response retornado):\n", /* await resp[0].text() */respBody);
        console.log(`Access token retornado: ${respBody.access_token}`);
        this.oauth2Token = respBody.access_token;
      }).catch(err => {
          console.error("Erro!!!", err);
          // throw err;
      }).finally( () => console.log(`Requisição encerrada. token atual é ${this.oauth2Token}`) );
    }

    return this.oauth2Token;
  }

  async obterOauth2AccessTokenSync(): Promise<string> {

    console.log(`this.oauth2Token === ${this.oauth2Token}`);

    if(this.primeiraVez) {
      this.primeiraVez = false;

      try {
        let resp = await this.__obterOauth2AccessToken(
          "http://localhost:8080/categorias",
          this.oauth2Token, "h");

        console.log("Resposta (array de objetos Response):\n", resp);

        if( !resp[0].ok ) {
          if(resp[0].status === 401) {
            let resp = await this.__obterOauth2AccessToken(
              "http://localhost:8080/oauth/token",
              this.basicToken,
              "p",
              false,
              undefined,
              // OAuth2 body params
              gerarFormData({
                "client": "angular",
                "username": "admin@algamoney.com",
                "password": "admin",
                "grant_type": "password"
              }));

            console.log("Resposta (array de objetos Response):\n", resp);
            let respBody = await resp[0].json();
            console.log("Corpo da resposta como JSON (1º objeto Response retornado):\n", /* resp[0].json() */respBody);
            // let respBody = await resp[0].text();
            // console.log("Corpo da resposta como texto (1º objeto Response retornado):\n", /* await resp[0].text() */respBody);
            console.log(`Access token retornado: ${respBody.access_token}`);
            this.oauth2Token = respBody.access_token;
          }
          else
            throw new Error(`Response retornou c/ seguinte erro: ${resp[0].status} - ${resp[0].statusText}`);
        }
      } catch(err) {
          console.error("Erro!!!", err);
          throw err;
      }
    }

    console.log(`this.oauth2Token === ${this.oauth2Token}`);
    return this.oauth2Token;
  }

  __obterOauth2AccessToken(oaut2Url: string, authToken: string, method: string, oauth2: boolean = true,
      headers?: HeadersInit | undefined, body?: any) {
    let myHeaders = (headers) ? new Headers(headers) : new Headers();

    if(oauth2) // OAuth2
      myHeaders.append("Authorization", `Bearer ${authToken}`);
    else // Basic
      myHeaders.append("Authorization", `Basic ${authToken}`);

    switch (method.toLowerCase()) {
      case 'g':
        method = "GET";
        break;
      case 'p':
        method = "POST";
        break;
      default:
        method = "HEAD";
        break;
    }

    if(body)
      return Promise.all([ fetch(oaut2Url, { method, headers: myHeaders, body }) ] );

    return Promise.all([ fetch(oaut2Url, { method, headers: myHeaders }) ] );
  }

}

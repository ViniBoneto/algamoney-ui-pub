import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

// 19.4. Implementando o serviço de autenticação com OAuth 2
//   Criando cls de serv p/ auth usando protocolo OAuth 2. Registra-o na lst de providers do mód core.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL p/ req de acesso oauth 2
  oauth2TokenUrl = "http://localhost:8080/oauth/token";
  // 19.5. Decodificando o JWT e armazenando no Local Storage:
  //   prop q vai armazenar o payload do JWT em formato JSON.
  jwtPayload: any;

  // Injetando serv de http p/ fzr conn ao servidor, requisitando token oauth 2
  // constructor(private http: HttpClient) { }

/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    Em nosso construtor, na classe AuthService, iremos receber como parametro um JwtHelperService, do pacote
      "@auth0/angular-jwt". Esta classe utilitária servirá p/ decodificar e extrair o payload do JWT.

    Não há diferenças na forma de utilizar essa biblioteca, comparado com o que foi ensinado na aula, as únicas
      diferenças são os tipos dos nossos atributos e de onde vamos importar. Já a forma de decodificar, e como
      armazenar este token, será da mesma maneira da aula. */
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    // O token está sendo mantido no local storage do nav. A cada recarregamento de pág ou reinicio de app, qdo o
    //   comp é reinst, é preciso buscá-lo, decodificá-lo e atribuí-lo à prop corresp.
    this.carregarToken();
  }

  login(usr: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    // Usa Content-Type = application/x-www-form-urlencoded, pois com isso no corpo da req se poderá passar
    //  os params no msm formato da query string: param1=val1&param2=val2&param3=val3...
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // Embora a app use auth do tp oauth 2, a auth p/ obter o token será do tp basic, sendo o token passado
    //  a str com a auth do app (ñ do usr), na forma clientID:secret (no caso, angular:@ngul@r0) codificada
    //  c/ alg Base64.
    headers = headers.append("Authorization", "Basic YW5ndWxhcjpAbmd1bEByMA==");
    // No corpo da req se passa os params no formato de query string
    const body = `client=angular&username=${usr}&password=${senha}&grant_type=password`;
    // O access token virá no corpo da resp, sendo acessível ao app NG. O refresh token (p/ renovar o acess token)
    //  virá num cookie, sendo manipulado e automaticamente enviado apenas pelo browser.
    return this.http.post(this.oauth2TokenUrl, body, { headers }).toPromise<any>()
      .then(resp => {
        console.log(resp);
        // 19.5. Decodificando o JWT e armazenando no Local Storage:
        //   Decodifica e armazena o JWT (access token), obtido a partir do corpo da resp, no local storage.
        this.armazenarToken(resp.access_token);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // 19.5. Decodificando o JWT e armazenando no Local Storage:
  //   Método q decodificará o token e o armazenará na prop do comp, em formato JSON.
  private decodificarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
  }

  // 19.5. Decodificando o JWT e armazenando no Local Storage:
  //   Método q decodificará e armazenará o token no local storage do domínio.
  private armazenarToken(token: string) {
    this.decodificarToken(token);
/*  Qdo armazenamos o JWT payload somente em memória, na prop, ao recarregar-se a pág, a app NG é reiniciada,
      uma nova inst do comp é criada e o payload é perdido (prop é reiniciada indefinida). P/ fzr c/ q a app
      ñ perca token e o usr continue identificado, ao se recarregar a pág, é preciso armazenar o token no local
      storage do nav. */
    localStorage.setItem("token", token);
  }

/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    Carrega o token JWT do local storage do nav. Se este existir, decodifica-o e atribui seu payload, em formato JSON,
      à prop do comp. */
  private carregarToken() {
    const token = localStorage.getItem("token");

    if(token) {
      this.decodificarToken(token);
    }
  }
}

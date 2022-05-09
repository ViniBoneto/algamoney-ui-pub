import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// 19.4. Implementando o serviço de autenticação com OAuth 2
//   Criando cls de serv p/ auth usando protocolo OAuth 2. Registra-o na lst de providers do mód core.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL p/ req de acesso oauth 2
  oauth2TokenUrl = "http://localhost:8080/oauth/token";

  // Injetando serv de http p/ fzr conn ao servidor, requisitando token oauth 2
  constructor(private http: HttpClient) { }

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
    return this.http.post(this.oauth2TokenUrl, body, { headers }).toPromise()
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.error(err);
      });
  }
}

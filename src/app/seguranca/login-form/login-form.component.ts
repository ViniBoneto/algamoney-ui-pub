import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

/* 19.3. Desafio: módulo de segurança e protótipo da tela de login:
  Criando mód de seg c/ mód aux de roteamento (ambos seguindo padrão de como já feito na app) e protótipo
  de tela de login. */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // constructor() { }

  // 19.4. Implementando o serviço de autenticação com OAuth 2:
  //  Injeta-se o mód de auth neste comp p/ q, ao se clicar no btn de login, o método de login do serv seja chamado.
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  // Tratar evt de login
  doLogin(usr: string, senha: string) {
    // console.info(`Login efetuado com sucesso!\tUsuário ${usr} logado com a senha ${senha}...`);

/*  19.4. Implementando o serviço de autenticação com OAuth 2:
      O access token virá no corpo da resp, sendo acessível ao app NG. O refresh token (p/ renovar o acess token)
      virá num cookie, sendo manipulado e automaticamente enviado apenas pelo browser. */
    this.auth.login(usr, senha);
  }

}

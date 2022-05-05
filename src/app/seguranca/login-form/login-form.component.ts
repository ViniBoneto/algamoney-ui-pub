import { Component, OnInit } from '@angular/core';

/* 19.3. Desafio: módulo de segurança e protótipo da tela de login:
  Criando mód de seg c/ mód aux de roteamento (ambos seguindo padrão de como já feito na app) e protótipo
  de tela de login. */
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Tratar evt de login
  doLogin(usr: string, senha: string) {
    console.info(`Login efetuado com sucesso!\tUsuário ${usr} logado com a senha ${senha}...`);
  }

}

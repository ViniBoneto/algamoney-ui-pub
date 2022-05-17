import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
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
  constructor(
    private auth: AuthService,
    // 19.6. Tratando casos de erros e sucesso de autenticação:
    //   Injeta serv de tratamento de erros, p/ poder tratar erros de login.
    private errorHndl: ErrorHandlerService,
    // 19.6. Tratando casos de erros e sucesso de autenticação:
    //   Injeta serv de roteamento, p/ redir p/ a tela de lançamentos, em caso de sucesso de login.
    private router: Router
    ) { }

/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    Modificador de acesso da variável auth:
      A versão 12 do Angular não permite o acesso a variáveis private dentro do template. Sendo assim, para que
        seja utilizada a interpolação é necessário alterar o modificador de acesso de private para public no
        construtor do componente LoginForm.

    Observação: Esta alteração deve ser realizada apenas para efeito de visualização da variável no template.
      Quando esta interpolação for retirada é adequado retornar o modificador para private. */
  // constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  // Tratar evt de login
  doLogin(usr: string, senha: string) {
    // console.info(`Login efetuado com sucesso!\tUsuário ${usr} logado com a senha ${senha}...`);

/*  19.4. Implementando o serviço de autenticação com OAuth 2:
      O access token virá no corpo da resp, sendo acessível ao app NG. O refresh token (p/ renovar o acess token)
      virá num cookie, sendo manipulado e automaticamente enviado apenas pelo browser. */
    this.auth.login(usr, senha)
/*  19.6. Tratando casos de erros e sucesso de autenticação:
      Trata sucesso de login no método Promise.then(). Apenas redir p/ a tela de lançamentos. Td o resto já
        foi feito no serv de auth (ex: armazenamento de token).

      Trata erro de login e d+ erros no método Promise.catch(), usando serv de tratamento de erros, q exibirá
        a msg de erro apropriada ao usr. */
    .then( () => {
      this.router.navigate(["/lancamentos"]);
    } )
    .catch( (err) => {
      this.errorHndl.handle(err);
    } );
  }

}

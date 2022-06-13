import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PERMISSOES } from 'src/app/seguranca/permissoes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibeMenu: boolean = false;

  // constructor() { }

/* 19.8. Exibindo o nome do usuário logado:
    O nome do usr logado pode ser obtido na prop jwtPayload do serv AuthService. Esta contém o payload
      decodificado do JWT, em formato JSON. Neste há uma prop nome, c/ a info q buscamos. P/ poder acessar
      a tal prop, vamos precisar injetar o AuthService no comp de barra de nav.

    Interpolação do nome de usuário logado:
      Conforme mencionado no material de apoio da aula 19.5, não é mais possível fazer a interpolação no
        template utilizando uma variável com modificador de acesso private. Para resolver o problema,
        criaremos uma variável usuárioLogado e inicializaremos esta variável no arquivo Typescript, c/ o
        val retornado p/ AuthService.jwtPayload.nome. */
  usuarioLogado: string = '';

/* 19.9. Exibindo o menu do sistema conforme permissões do usuário:
    Cria-se uma prop c/ subprops q mapeiam p/ os membros do enum PERMISSOES. Isto deve ser feito p/ driblar
      a restrição de não se poder referenciar diretamente o enum no templ e se poder passar, indiretamente,
      o val dum membro deste enum no método temPermissao(), tb chamado no templ. */
  permissoes = {
    ROLE_CADASTRAR_CATEGORIA: PERMISSOES.ROLE_CADASTRAR_CATEGORIA,
    ROLE_PESQUISAR_CATEGORIA: PERMISSOES.ROLE_PESQUISAR_CATEGORIA,
    ROLE_CADASTRAR_PESSOA: PERMISSOES.ROLE_CADASTRAR_PESSOA,
    ROLE_REMOVER_PESSOA: PERMISSOES.ROLE_REMOVER_PESSOA,
    ROLE_PESQUISAR_PESSOA: PERMISSOES.ROLE_PESQUISAR_PESSOA,
    ROLE_CADASTRAR_LANCAMENTO: PERMISSOES.ROLE_CADASTRAR_LANCAMENTO,
    ROLE_REMOVER_LANCAMENTO: PERMISSOES.ROLE_REMOVER_LANCAMENTO,
    ROLE_PESQUISAR_LANCAMENTO: PERMISSOES.ROLE_PESQUISAR_LANCAMENTO
  };

  constructor(
    private auth: AuthService,
    // 19.16. Implementando o logout:
    //   Injeta servs de roteamento, p/ redir o usr p/ pág de login, e de tratamento de erro, p/ tratar
    //     erro de logout.
    private router: Router,
    private errorHndlr: ErrorHandlerService
    ) { }

  ngOnInit(): void {
    // 19.8. Exibindo o nome do usuário logado:
    //  O oper ? é pq jwtPayload pode ser nula. Logo, o compilador ñ reclamará.
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

/* 19.9. Exibindo o menu do sistema conforme permissões do usuário:
    Vamos criar no AuthService um método p/ verificar se o usr logado tem uma determinada permissão.

    Interpolação da função de verificação de permissões:
      Conforme mencionado no material de apoio da aula 19.5, não é mais possível fazer a interpolação
        no template utilizando uma variável com modificador de acesso private. Para resolver o problema,
        criaremos um método temPermissao() em NavbarComponent que fará referência ao método de mesmo nome
        presente em AuthService.

    Obs: Abaixo é aplicado uma oper de map reverso c/ enum numérico, como explicado no link
      https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings */
  temPermissao(permissao: PERMISSOES) {
    let permStr = PERMISSOES[permissao];

    return this.auth.temPermissao(permStr);
  }

  // 19.10. Obtendo um novo access token:
  //   P/ enquanto inseriremos um btn no menu p/ o usr pressionar e obter um novo access token, via req de
  //     refresh token. Este processo será automatizado posteriormente.
  obterNovoAccessToken() {
    this.auth.obterNovoAccessToken();
  }

  // 19.16. Implementando o logout:
  //   Cria método logout() no navbar, a ser acionado ao se clicar o btn de logout, q invoca método de logout()
  //     do serv de auth e redir usr p/ pág de login.
  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(["/login"]);
      })
      .catch( err => this.errorHndlr.handle(err) );
  }
}

import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/seguranca/auth.service';

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

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    // 19.8. Exibindo o nome do usuário logado:
    //  O oper ? é pq jwtPayload pode ser nula. Logo, o compilador ñ reclamará.
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { AuthService } from 'src/app/seguranca/auth.service';
import { PERMISSOES } from 'src/app/seguranca/permissoes';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas: Object[] = [];

/* 17.7. Desafio: criando a consulta e listagem de pessoas:
    Repetindo p/ o comp de grid de pessoas o msm q foi feito p/ o de grid de lançamentos (aulas 17.2-17.6).

  Insere props de entrada totRegs e itensPag, respectivamente c/ total de regs da consulta e itens p/ pág.
    Tb insere evto de saída mudancaPagEvt, p/ avisar ao comp pai (pessoas pesquisa) q uma nova pág foi
    selecionada e uma nova pesquisa deve ser feita.

  Cria-se tb o método aoMudarPag(), q será ativado no evt de mudança de pág da tab de dados e disparará o evt
    de saída mudancaPagEvt, indicando a mudança de pág p/ o comp pai (pessoas pesquisa).  */
  @Input() totRegs: number = 0;
  @Input() itensPag: number = 3;

  @Output() mudancaPagEvt = new EventEmitter<number>();

/* 17.13. Desafio: implementando a exclusão de pessoas:
    De modo análogo ao q foi feito no grid de lancs, cria um evto de saída, acionado no clique do btn de exclusão
    de pessoas, q irá notificar e repassar o elem a ser excluído ao comp pai. */
  @Output() exclusaoPessoaEvt = new EventEmitter<Object>();

/* 17.15. Desafio: implementando a mudança de status de pessoas:
    Cria um evto de saída, acionado no clique do btn de altareação de status pessoa (atiavação/inativação), q irá
    notificar e repassar o elem a ser ativado/inativado ao comp pai. */
  @Output() altStatPessoaEvt = new EventEmitter<Object>();

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

/* 17.13. Desafio: implementando a exclusão de pessoas:
    Vamos usar o decorador @ViewChild p/ ligar a prop grid ao elem PNG p-table da view, de modo análogo ao
    q foi feito c/ grid de lançamentos (LancamentosGridComponent). */
  @ViewChild("tabPessoa") grid: any;

  // 19.9. Exibindo o menu do sistema conforme permissões do usuário:
  //   P/ se verificar as perms do usr e ocultar os menus ñ autorizados é preciso injetar no comp o serv de auth.
  constructor(private auth: AuthService) { }

  aoMudarPag(evt: LazyLoadEvent) {
/*  Tp LazyLoadEvent indica um evto de mudança de pág. Campo LazyLoadEvent.first indica deslocamento da 1ª lin da pág.
      Campo LazyLoadEvent.rows indica nº de lins p/ pág. P/ calc o ind da pág a ser carregada (começando do 0 p/ 1ª pág),
      basta dividir o primeiro pelo segundo. */
    let primReg = (evt.first ? evt.first : 0),
      regsPag = (evt.rows ? evt.rows : 1),
      pag = primReg / regsPag;

    this.mudancaPagEvt.emit(pag);
  }

/* 17.13. Desafio: implementando a exclusão de pessoas:
    Cria um método p/ atualizar (resetar) o grid de pessoas, após a exclusão duma linha, de modo análogo
    ao q foi feito c/ o grid de lançamentos ( método LancamentosGridComponent.atualizarGrid() ). */
  atualizarGrid() {
    // console.log("Reiniciando estado grid c/ método p-table.reset()...");
    this.grid.reset();
  }

/* 17.13. Desafio: implementando a exclusão de pessoas:
    De modo análogo ao q foi feito no grid de lancs, associa o clique do btn de exclusão de pessoas a um
    método hndlr, q irá repassar o evento e o elem a ser excluído ao comp pai. */
  aoExcluirPessoa(pessoa: any) {
    this.exclusaoPessoaEvt.emit(pessoa);
  }

/* 17.15. Desafio: implementando a mudança de status de pessoas:
    Associa o clique do btn de ativação/desativação de pessoas a um método hndlr, q irá repassar o evento
    e o elem cujo status será alterado ao comp pai. */
  aoMudarStatPessoa(pessoa: any) {
    this.altStatPessoaEvt.emit(pessoa);
  }

/* 19.9. Exibindo o menu do sistema conforme permissões do usuário:
    Vamos criar no AuthService um método p/ verificar se o usr logado tem uma determinada permissão.

    Interpolação da função de verificação de permissões:
      Conforme mencionado no material de apoio da aula 19.5, não é mais possível fazer a interpolação
        no template utilizando uma variável com modificador de acesso private. Para resolver o problema,
        criaremos um método temPermissao() no comp de grid que fará referência ao método de mesmo nome
        presente em AuthService.

    Obs: Abaixo é aplicado uma oper de map reverso c/ enum numérico, como explicado no link
      https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings */
  temPermissao(permissao: PERMISSOES) {
    let permStr = PERMISSOES[permissao];

    return this.auth.temPermissao(permStr);
  }
}

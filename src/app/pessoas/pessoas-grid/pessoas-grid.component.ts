import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

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
    de pessoas, q irá notificar e repssar o elem a ser excluído ao comp pai. */
  @Output() exclusaoPessoaEvt = new EventEmitter<Object>();

/* 17.13. Desafio: implementando a exclusão de pessoas:
    Vamos usar o decorador @ViewChild p/ ligar a prop grid ao elem PNG p-table da view, de modo análogo ao
    q foi feito c/ grid de lançamentos (LancamentosGridComponent). */
  @ViewChild("tabPessoa") grid: any;

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
    De modo análogo ao q foi feito no grid de lancs, associao o clique do btn de exclusão de pessoas a um
    método hndlr, q irá repassar o evento e o elem a ser excluído ao comp pai. */
  aoExcluirPessoa(pessoa: any) {
    this.exclusaoPessoaEvt.emit(pessoa);
  }
}

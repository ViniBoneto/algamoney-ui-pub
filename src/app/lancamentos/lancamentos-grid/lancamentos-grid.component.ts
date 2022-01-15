import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos: Object[] = [];
/* 17.6. Configurando a paginação lazy do PrimeNG:
    Insere props de entrada totRegs e itensPag, respectivamente c/ total de regs da consulta e itens
    p/ pág, a serem associadas aos atribs da tab de dados do PNG [totalRecords] e [rows], respectivamente.
    Elas serão necessárias no cálculo de qtas págs serão necessárias p/ exibir tds os registros. */
  @Input() totRegs: number = 0;
  @Input() itensPag: number = 3;

/* 17.6. Configurando a paginação lazy do PrimeNG:
    Insere evto de saída mudancaPagEvt, p/ avisar ao comp pai (lançamentos pesquisa) q uma nova pág foi
    selecionada e uma nova pesquisa deve ser feita, no servidor, p/ trazer os regs relativos a esta pág.
    O arg emitido pelo evt de saída é o nº (ind) da pág a ser carregada.

  Cria-se tb o método aoMudarPag(), q será ativado no evt de mudança de pág da tab de dados e disparará
    o evt de saída mudancaPagEvt, indicando a mudança de pág p/ o comp pai (lançamentos pesquisa). Este
    método recebe um param do tp LazyLoadEvent. Isto é, ele recebe o evto de solicitação de carregamento
    dinâmico da tab de dados (LazyLoadEvent), c/ infos sobre a nova pág a ser carregada. */
  @Output() mudancaPagEvt = new EventEmitter<number>();

  aoMudarPag(evt: LazyLoadEvent) {
    // console.log(`Func aoMudarPag():\n\tevt recebido:\n\t\t${evt}\n\t\t${JSON.stringify(evt)}`);

/*  Campo LazyLoadEvent.first indica deslocamento da 1ª lin da pág. Campo LazyLoadEvent.rows indica nº
      de lins p/ pág. P/ calc o ind da pág a ser carregada (começando do 0 p/ 1ª pág), basta dividir o
      primeiro pelo segundo. O ind da pág q deve ser buscada será então repassado ao comp pai (lançamentos
      pesquisa) através da emissão do evt de saída mudancaPagEvt. */
    let primReg = (evt.first ? evt.first : 0),
      regsPag = (evt.rows ? evt.rows : 1),
      pag = primReg / regsPag;

    this.mudancaPagEvt.emit(pag)
  }
}

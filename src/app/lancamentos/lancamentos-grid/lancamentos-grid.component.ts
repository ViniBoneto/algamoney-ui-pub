import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/api';

import { objParaStr } from '../../shared/shared.module';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
// export class LancamentosGridComponent {

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
  Implementando a inter AfterViewInit apenas p/ testar se o uso de prop c/ decorador @ViewChild funcionou.
  Implementando tb a inter AfterContentInit ( vide método ngAfterContentInit() ). */
export class LancamentosGridComponent implements AfterViewInit, AfterContentInit {

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

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Evto de saída q notificará o o comp pai (pesquisa lançamentos) da exclusão de um lançamento, repassando
    a ele o lançamento a ser excluído. */
  @Output() exclusaoLancEvt = new EventEmitter<Object>();

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Vamos usar o decorador @ViewChild, q é um decorador q configura uma consulta a um elem/comp filho na view,
    p/ ligar a prop local grid c/ a tab de lançamentos no DOM, marcada c/ a var #tabLanc (esta var será usada
    p/ fazer a ligação, sendo atribuída à prop @ViewChild.selector). */
  @ViewChild("tabLanc") grid: any;

  // 17.8. Excluindo lançamentos e o decorador @ViewChild:
  //   Implementando a interface AfterViewInit apenas p/ testar se o uso de prop c/ decorador @ViewChild funcionou.
  ngAfterViewInit() {
    // console.log(`Componente Grid Lançamentos Mapeado:\n${this.grid}`);
    // console.log(`Componente Grid Lançamentos Mapeado:\n${JSON.stringify(this.grid)}`);

    // Importa e usa a func SharedModule.objParaStr(), p/ imprimir suas props enumeráveis diretas. Isto foi
    //  feito após as abordagens acima (comentadas) falharem em exibir corretamente as props do obj.
    //  Obs: Comentei o método abaixo e o movi p/ func ngOnit
    // console.log(`Método LancamentosGridComponent.ngAfterViewInit():\nComponente Grid Lançamentos Mapeado:\n${objParaStr(this.grid)}`);
  }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    No método handler ngAfterViewInit(), chamado após a view do comp já estar inicializada, a prop grid já está
    associada à tab de dados do PNG e está exibindo tds as props desta. Porém tds elas estão c/ val undefined.
    Apenas p/ fazer um tst, estou fazendo log no grid neste método, chamado após td o conteúdo duma dir ou comp
    estar inicializado, p/ ver se aqui as props da tab já se encontram c/ vals válidos.

  Obs: Ñ deu certo, pois descobri q o método AfterContentInit.ngAfterContentInit() é chamado ainda antes do método
    AfterViewInit.ngAfterViewInit() no ciclo de inicialização do comp! */
  ngAfterContentInit() {
    // console.log(`Método ngAfterContentInit():\nComponente Grid Lançamentos Mapeado:\n${objParaStr(this.grid)}`);
  }

  aoMudarPag(evt: LazyLoadEvent) {
    // console.log(`Func aoMudarPag():\n\tevt recebido:\n\t\t${evt}\n\t\t${JSON.stringify(evt)}`);

/*  Campo LazyLoadEvent.first indica deslocamento da 1ª lin da pág. Campo LazyLoadEvent.rows indica nº
      de lins p/ pág. P/ calc o ind da pág a ser carregada (começando do 0 p/ 1ª pág), basta dividir o
      primeiro pelo segundo. O ind da pág q deve ser buscada será então repassado ao comp pai (lançamentos
      pesquisa) através da emissão do evt de saída mudancaPagEvt. */
    let primReg = (evt.first ? evt.first : 0),
      regsPag = (evt.rows ? evt.rows : 1),
      pag = primReg / regsPag;

    this.mudancaPagEvt.emit(pag);
  }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Responde ao evto do btn de exclusão de um lançamento, recebendo o lançamento a ser excluído, notificando
    o comp pai (pesquisa lançamentos) da exclusão, repassando a ele o lançamento. O comp pai é quem, de fato,
    solicitará a eclusão ao serv de lançamentos. */
  aoExcluirLanc(lancamento: any) {
    this.exclusaoLancEvt.emit(lancamento);
  }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Cração método atualizarGrid(), q será chamado pelo comp pai (lançamentos pesquisa) após este excluir um lançamento
    c/ sucesso, p/ q este atualize seu grid interno (tab de dados do PNG), afim de refletir o novo estado, s/ o
    lançamento excluído.

   Obs: Por utilizarmos o componente Table nesta versão, apenas indicar o valor da propriedade first não vai gerar o
    resultado esperado. Este componente, por outro lado, possui um método chamado "reset". Iremos usar este método para
    reiniciar o estado da nossa tabela. */
  atualizarGrid() {
    // console.log("Reiniciando estado grid c/ método p-table.reset()...");
    this.grid.reset();
  }
}

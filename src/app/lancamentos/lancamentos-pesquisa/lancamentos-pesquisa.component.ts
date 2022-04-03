import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { LancamentosGridComponent } from '../lancamentos-grid/lancamentos-grid.component';
import { objParaStr } from '../../shared/shared.module';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  // 11.8. Desafio: usando pipes: alterar campos de data de str p/ Date, usando DatePipe no template p/ conseguir
  //   deixá-la no msm formato que estava na str (dd/MM/yyyy). Também usar CurrencyPipe no template p/ conseguir
  //   deixar campo val formatado em Real (R$).
  lancamentos = [
/* 17.2. Criando o serviço de consulta de lançamentos:
     Comentando os lançamentos colocados "hard coded", p/ deixar o array de lançamentos vazio. Este será agora
     preenchido dinâmicamente, a partir da app de background (Algamoney-api), através de req de consulta http
     feita pelo serv de lançamentos. */
    // { tipo: "DESPESA", descricao: "Cancun", dataVencimento: new Date(2019, 1, 28)/* "28/02/2019" */, dataPagamento: new Date(2019, 1, 10)/* "10/02/2019" */, valor: 210.12, pessoa: "Beijamin Argola" },
    // { tipo: "RECEITA", descricao: "Top Club", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 120.00, pessoa: "Ava Berta" },
    // { tipo: "RECEITA", descricao: "CEMIG", dataVencimento: new Date(2017, 1, 10)/* "10/02/2017" */, dataPagamento: new Date(2017, 1, 10)/* "10/02/2017" */, valor: 110.44, pessoa: "Cuca Alves Beludo" },
    // { tipo: "DESPESA", descricao: "DMAE", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 200.30, pessoa: "Botelho Soares Pinto" },
    // { tipo: "DESPESA", descricao: "Lançamento Extra", dataVencimento: new Date(2017, 2, 10)/* "10/03/2017" */, dataPagamento: null, valor: 2020.64, pessoa: "Ava Berta" },
    // { tipo: "RECEITA", descricao: "Bahamas", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 500.00, pessoa: "Beijamin Argola" },
    // { tipo: "DESPESA", descricao: "Top Club", dataVencimento: new Date(2017, 2, 10)/* "10/03/2017" */, dataPagamento: new Date(2017, 2, 10)/* "10/03/2017" */, valor: 400.32, pessoa: "Laís C. Navarra" },
    // { tipo: "DESPESA", descricao: "Despachante", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 123.64, pessoa: "Major Tommas" },
    // { tipo: "RECEITA", descricao: "Pneus", dataVencimento: new Date(2017, 3, 10)/* "10/04/2017" */, dataPagamento: new Date(2017, 3, 10)/* "10/04/2017" */, valor: 665.33, pessoa: "Patinhas McPato" },
    // { tipo: "DESPESA", descricao: "Café", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 8.32, pessoa: "Botelho Soares Pinto" },
    // { tipo: "DESPESA", descricao: "Eletrônicos", dataVencimento: new Date(2017, 3, 10)/* "10/04/2017" */, dataPagamento: new Date(2017, 3, 10)/* "10/04/2017" */, valor: 2100.32, pessoa: "Cuca Alves Beludo" },
    // { tipo: "DESPESA", descricao: "Instrumentos", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 1040.32, pessoa: "Ava Berta" },
    // { tipo: "DESPESA", descricao: "Café", dataVencimento: new Date(2017, 3, 10)/* "10/04/2017" */, dataPagamento: new Date(2017, 3, 10)/* "10/04/2017" */, valor: 4.32, pessoa: "Romeu Pinto" },
    // { tipo: "DESPESA", descricao: "Lanche", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 10.20, pessoa: "Jacinto L. Aquino Rego" },
    // { tipo: "RECEITA", descricao: "Prêmio semestral", dataVencimento: new Date(2017, 0, 10)/* "10/01/2017" */, dataPagamento: null, valor: 10500.00, pessoa: "Major Tommas" }
  ];

  // 17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
  //  Adiciona uma prop de descr de lançamento q será ligada p/ 2 way databind ao campo equivalente do tmpl html.
  // descricao?: string;

  // 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
  //   Adiciona vars p/ dts de venc max e min q, a exemplo da descr, tb será ligada a campos equivalentes do html.
  // dataVencimentoIni?: Date;
  // dataVencimentoFim?: Date;

/*  17.5. Implementando a paginação no serviço de lançamentos:
      P/ simplificar o cód e lidar c/ as novas props de paginação pré-inicializadas adicionadas, substitui as props
      de instância individuais de filtro p/ uma prop de instância do tipo LancamentoFiltro (agora uma cls).

    Ao invés de continuarem mapeados às props individuais de filtro, campos equivalentes do html serão mapeados às
    props internas da prop do tipo LancamentoFiltro. */
  filtro: LancamentoFiltro = new LancamentoFiltro();

/* 17.6. Configurando a paginação lazy do PrimeNG:
  Acrescendo prop c/ total de regs da consulta, p/ ser usada no cálculo da pág a ser carregada, c/ paginação dinâmica
  da tab de dados do PNG. */
  totRegs: number = 0;

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Vamos usar o decorador @ViewChild, q é um decorador q configura uma consulta a um elem/comp filho na view,
    p/ ligar a prop local grid c/ o comp de grid de lançamentos no DOM, marcado c/ a var #gridLanc (esta var será
    usada p/ fazer a ligação, sendo atribuída à prop @ViewChild.selector). */
  @ViewChild("gridLanc") grid: LancamentosGridComponent | undefined;

/* 17.2. Criando o serviço de consulta de lançamentos:
    Comp de pesquisa de lançamentos receberá um serv de lançamentos por inj de depend (D.I.), em seu construtor.
    Este serv será usado p/ acessar os lançamentos no backend. */
  // constructor(private lancaServ: LancamentoService) {}

/* 17.9. Adicionando mensagem de sucesso com Angular Toasty:
    Incompatibilidade com ng2-toasty: A biblioteca ng2-toasty não é compatível com a versão 12 do Angular.
    Por esta razão, utilizaremos o componente Toast do PrimeNG.

  Injetamos o MessageService no nosso LancamentosPesquisaComponent e adicionamos a mensagem de sucesso na exclusão do lançamento. */
  // constructor(
  //   private lancaServ: LancamentoService,
  //   private msgServ: MessageService
  // ) {}

/* 17.10. Adicionando diálogo de confirmação antes da exclusão:
    Injetamos o ConfirmationService no nosso LancamentosPesquisaComponent e adicionamos a mensagem de confirmação antes da exclusão
    do lançamento (o passo a passo é muito semelhante ao da inclusão do comp de msg Toast, na aula anterior). */
  // constructor(
  //   private lancaServ: LancamentoService,
  //   private msgServ: MessageService,
  //   private confirmServ: ConfirmationService
  // ) {}

// 17.12. Criando um serviço de tratamento de erros:
//   Injeta serv de tratamento de erros p/ tratar e exibir erros nas opers do comp.
  constructor(
    private lancaServ: LancamentoService,
    private errServ: ErrorHandlerService,
    private msgServ: MessageService,
    private confirmServ: ConfirmationService,

/*  18.12. Definindo o título da página dinamicamente:
      O cód dos comps NG são renderizados, a partir do comp raiz (app-root), é renderizado no corpo (<body>) da pág
      índice da app (index.html). P/ conta disto, o título da app, q está na tag <title> da msg pág índice, ñ pode
      ser manipulado diretamente pelo cód das views e comps do NG. Então, p/ se obter e/ou alterar o título da app,
      usa-se o serv Title, fonecido pelo NG. */
    private title: Title
  ) {}

/* 17.2. Criando o serviço de consulta de lançamentos:
    Invoca o método de consulta de lançamentos logo após o comp ser instanciado e suas props de dados inicializadas,
    para q o array de lançamentos seja preenchido. */
  ngOnInit(): void {
/* 17.6. Configurando a paginação lazy do PrimeNG:
      Ñ há + necessidade de se invocar o método this.pesquisar() aqui p/ carregar os lançamentos, pois c/ a tab de dados
      do PNG em modo lazy (atrib [lazy]=true), o método de carregamento p/ primeira pág (método handler atribuído ao evt
      onLazyLoad, c/ nº pág 0) será automaticamente invocado qdo o comp for carregado (as d+ págs serão carregadas conforme
      a paginação no comp for efetuada). */
    // this.pesquisar();

    // 18.12. Definindo o título da página dinamicamente:
    //   Alterando dinamicamente o título da pág de pesquisa de lançs através do serv Title.
    this.title.setTitle("Pesquisa lançamentos");
  }

  // 17.2. Criando o serviço de consulta de lançamentos:
  //   Cria um método de consulta de lançamentos q invoca o método de consulta do serv de lançamentos.
  // pesquisar() {

/* 17.6. Configurando a paginação lazy do PrimeNG:
    A partir de agora, o método pesquisar() passará a receber um param c/ o nº da pág a ser carregada. Caso nenhum seja
    fornecido, o assumido p/ padrão será 0. O nº da pág será acrescido aos params do obj filtro, a ser passado ao método
    LancamentoService.pesquisar(). */
  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    // this.lancaServ.pesquisar().then(

/*  17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
      Passa um param ao método de pesquisa, contendo os possíveis filtros à consulta de lançamentos. Primeiramente,
      só descr lançamento será adicionada, d+ filtros (dts vencs) serão adicionados posteriormente.

    O param de descr lançamento é uma prop de instância do comp, q será ligada p/ 2 way databind ao campo equivalente
      do tmpl html. */
    // this.lancaServ.pesquisar({ descricao: this.descricao}).then(

/*  17.4. Adicionando filtro por datas na pesquisa de lançamentos:
      Vamos substituir o obj literal, passado anteriormente como param, p/ uma var do tp LancamentoFiltro,
      definida anteriormente. Isto p/ simplificação e limpeza do cód, pois, c/ a adição dos campos de dts,
      o obj literal fica mais complexo. */
    // const filtro: LancamentoFiltro = {
    //   descricao: this.descricao,
    //   dataVencimentoIni: this.dataVencimentoIni,
    //   dataVencimentoFim: this.dataVencimentoFim
    // };

    // this.lancaServ.pesquisar(filtro).then(

/*  17.5. Implementando a paginação no serviço de lançamentos:
      P/ simplificar o cód e lidar c/ as novas props de paginação pré-inicializadas adicionadas, substitui
      o obj literal de filtro, comentado acima, p/ uma prop de instância do tipo LancamentoFiltro (agora
      uma cls), já instanciada. */
    this.lancaServ.pesquisar(this.filtro).then(
/*    Recebe o array de lançamentos da Promise resolvida e o atribui à prop do comp, p/ q sejam exibidos
       no comp de grid do PNG.

      Obs: P/ enquanto a paginação ñ está sendo feita no servidor (Spring). Tds os lançamentos são trazidos do
        servidor e a paginação de lançamentos é feita no cliente (NG), pelo comp de grid do PNG. Isto será mudado
        futuramente. */
        // (dadosLancamentos) => this.lancamentos = dadosLancamentos

/*      17.5. Implementando a paginação no serviço de lançamentos:
          Agora ñ iremos mais retornar apenas o array de lançamentos. Retornaremos um obj contendo tanto o
          array de lançamentos (prop resp.lancamentos) qto o total de lançamentos (prop resp.total). */
        // (resp) => this.lancamentos = resp.lancamentos

/*      17.6. Configurando a paginação lazy do PrimeNG:
          Acrescendo prop c/ total de regs da consulta, p/ ser usada no cálculo da pág a ser carregada, c/ paginação
          dinâmica da tab de dados do PNG. */
        (resp) => {
          this.lancamentos = resp.lancamentos;
          this.totRegs = resp.total;
        }
    )
/*  17.12. Criando um serviço de tratamento de erros:
      Adiciona um método catch() à cadeia de Promises, p/ poder capturar e tratar erros, usando o serv de tratamento
      de erros. */
    .catch(erro => this.errServ.handle(erro));
  }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Exlcui um determinado lançamento no backend, invocando o método excluir(), do serv de lançamentos associado
    a este comp. */
  excluir(lancamento: any) {
    // const resolvfn = (value: any) => Promise.resolve(value);

    // new Promise( (resolvfn) => {
    //     console.log(`Componente Grid Lançamentos Mapeado:\n${this.grid}`);
    //     resolvfn(true);
    //   }).then(() => {

    this.lancaServ.excluir(lancamento.codigo).then(() => {
      console.log(`Excluído lançamento id ${lancamento.codigo}.`);

/*    Quando o lancamento é excluído, a pág ñ é automaticamente recarregada. P/ isto, o lançamento removido
        continua aparecendo no grid e é preciso fazer uma atualização manual da pág (refresh). P/ resolver isto,
        vamos fazer uma invocação ao método this.pesquisar(), q invocará os dados da 1ª pág, fazendo c/ q o grid
        e a pág sejam automaticamente atualizados. */
      // this.pesquisar();

/*    Porém, aos se tentar a solução acima ( método this.pesquisar() ), aparece outro probl: o grid é recarregado
        c/ os dados da 1ª pág (pág 0), porém o estado interno do grid (comp tab do PGN) ñ é atualizado e o ponteiro
        de paginação continua apontando p/ a pág em q estava o lançamento excluído (no exemp, a 2ª pág), embora os
        dados exibidos sejam sempre da 1ª pág. P/ superar este probl fazemos o seguinte: Vamos usar o decorador @ViewChild,
        q é um decorador q configura uma consulta a um elem/comp filho na view, p/ ligar a prop local grid c/ o comp de
        grid de lançamentos no DOM, marcado c/ a var #gridLanc (esta var será usada p/ fazer a ligação, sendo atribuída
        à prop @ViewChild.selector). Então, vamos invacar o método atualizarGrid(), do grid de lançamentos, reiniciar o
        estado da nossa tabela, refletindo a exclusão do lançamento. */
      if(this.grid)
        this.grid.atualizarGrid();

      // Importa e usa a func SharedModule.objParaStr(), p/ imprimir suas props enumeráveis diretas do comp this.grid, testando
      //  assim, se ele foi mapeado c/ sucesso.
      // console.log(`Método LancamentosPesquisaComponent.excluir():\nComponente Grid Lançamentos Mapeado:\n${objParaStr(this.grid)}`);

/*    17.9. Adicionando mensagem de sucesso com Angular Toasty:
        Incompatibilidade com ng2-toasty: A biblioteca ng2-toasty não é compatível com a versão 12 do Angular.
        Por esta razão, utilizaremos o componente Toast do PrimeNG.

      Injetamos o MessageService no nosso LancamentosPesquisaComponent e adicionamos a mensagem de sucesso na exclusão do lançamento. */
      this.msgServ.add({
        severity:'success',
        summary:'Lançamento excluído com sucesso!',
        detail:`Exclusão feita para lançamento id ${lancamento.codigo}.`
      });
    })
/*  17.12. Criando um serviço de tratamento de erros:
      Adiciona um método catch() à cadeia de Promises, p/ poder capturar e tratar erros, usando o serv de tratamento
      de erros. */
    .catch(erro => this.errServ.handle(erro));
  }

/* 17.10. Adicionando diálogo de confirmação antes da exclusão:
    Chamados o método ConfirmationService.confirm() p/, em conjunto com o comp PNG p-confirmDialog, exibir uma msg de confirmação
    antes de se excluir um lançamento. Se o usuário confirmar, exclui-se. Senão ñ. P/ isto, criamos o método abaixo, a ser chamado
    antes do método excluir(), propriamente dito, no processo de exclusão. */
  confirmarExclusao(lancamento: any) {
    this.confirmServ.confirm({
      // Str c/ msg de confirmação
      message: "Tem certeza que deseja excluir o lançamento?",
/*    Hndl p/ tratar aceitação do usuário. Neste método vamos invocar o método de exclusão, propriamente dito. Opcionalmente,
       pode-se tb fornecer um hndl p/ rejeião (ñ confirmação). Neste caso não há necessidade, pois se em caso de rejeição,
       basta se fechar a jan de confirm. */
      accept: () => this.excluir(lancamento)
    });
  }
}

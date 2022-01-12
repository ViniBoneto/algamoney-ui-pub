import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

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

/* 17.2. Criando o serviço de consulta de lançamentos:
    Comp de pesquisa de lançamentos receberá um serv de lançamentos por inj de depend (D.I.), em seu construtor.
    Este serv será usado p/ acessar os lançamentos no backend. */
  constructor(private lancaServ: LancamentoService) {}

/* 17.2. Criando o serviço de consulta de lançamentos:
    Invoca o método de consulta de lançamentos logo após o comp ser instanciado e suas props de dados inicializadas,
    para q o array de lançamentos seja preenchido. */
  ngOnInit(): void {
    this.pesquisar();
  }

  // 17.2. Criando o serviço de consulta de lançamentos:
  //   Cria um método de consulta de lançamentos q invoca o método de consulta do serv de lançamentos.
  pesquisar() {
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
        (resp) => this.lancamentos = resp.lancamentos
    );
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  // 11.8. Desafio: usando pipes: alterar campos de data de str p/ Date, usando DatePipe no template p/ conseguir
  //   deixá-la no msm formato que estava na str (dd/MM/yyyy). Também usar CurrencyPipe no template p/ conseguir
  //   deixar campo val formatado em Real (R$).
  lancamentos = [
    { tipo: "DESPESA", descricao: "Cancun", dataVencimento: new Date(2019, 1, 28)/* "28/02/2019" */, dataPagamento: new Date(2019, 1, 10)/* "10/02/2019" */, valor: 210.12, pessoa: "Beijamin Argola" },
    { tipo: "RECEITA", descricao: "Top Club", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 120.00, pessoa: "Ava Berta" },
    { tipo: "RECEITA", descricao: "CEMIG", dataVencimento: new Date(2017, 1, 10)/* "10/02/2017" */, dataPagamento: new Date(2017, 1, 10)/* "10/02/2017" */, valor: 110.44, pessoa: "Cuca Alves Beludo" },
    { tipo: "DESPESA", descricao: "DMAE", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 200.30, pessoa: "Botelho Soares Pinto" },
    { tipo: "DESPESA", descricao: "Lançamento Extra", dataVencimento: new Date(2017, 2, 10)/* "10/03/2017" */, dataPagamento: null, valor: 2020.64, pessoa: "Ava Berta" },
    { tipo: "RECEITA", descricao: "Bahamas", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 500.00, pessoa: "Beijamin Argola" },
    { tipo: "DESPESA", descricao: "Top Club", dataVencimento: new Date(2017, 2, 10)/* "10/03/2017" */, dataPagamento: new Date(2017, 2, 10)/* "10/03/2017" */, valor: 400.32, pessoa: "Laís C. Navarra" },
    { tipo: "DESPESA", descricao: "Despachante", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 123.64, pessoa: "Major Tommas" },
    { tipo: "RECEITA", descricao: "Pneus", dataVencimento: new Date(2017, 3, 10)/* "10/04/2017" */, dataPagamento: new Date(2017, 3, 10)/* "10/04/2017" */, valor: 665.33, pessoa: "Patinhas McPato" },
    { tipo: "DESPESA", descricao: "Café", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 8.32, pessoa: "Botelho Soares Pinto" },
    { tipo: "DESPESA", descricao: "Eletrônicos", dataVencimento: new Date(2017, 3, 10)/* "10/04/2017" */, dataPagamento: new Date(2017, 3, 10)/* "10/04/2017" */, valor: 2100.32, pessoa: "Cuca Alves Beludo" },
    { tipo: "DESPESA", descricao: "Instrumentos", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 1040.32, pessoa: "Ava Berta" },
    { tipo: "DESPESA", descricao: "Café", dataVencimento: new Date(2017, 3, 10)/* "10/04/2017" */, dataPagamento: new Date(2017, 3, 10)/* "10/04/2017" */, valor: 4.32, pessoa: "Romeu Pinto" },
    { tipo: "DESPESA", descricao: "Lanche", dataVencimento: new Date(2017, 5, 10)/* "10/06/2017" */, dataPagamento: null, valor: 10.20, pessoa: "Jacinto L. Aquino Rego" },
    { tipo: "RECEITA", descricao: "Prêmio semestral", dataVencimento: new Date(2017, 0, 10)/* "10/01/2017" */, dataPagamento: null, valor: 10500.00, pessoa: "Major Tommas" }
  ];

}

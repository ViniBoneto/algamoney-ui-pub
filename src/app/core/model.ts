import { DataService } from "../shared/data.service";

/* 17.19. Criando classes de modelo e usando no cadastro de lançamentos:
  Criando arq c/ def de clss de negócios (modelo) Lancamento, Categoria e Pessoa. Estas clss servem p/
  deixar o cód tipado e p/ os tps ficarem documentados. Servem tb p/ facilitar o controle, validação do
  cód e até o mapeamento de props p/ parte da IDE, em tempo de dev. */
export class Pessoa {
  // P/ enquanto só vamos criar a prop cód, p/ poder cadastrar lanc e pessoa associada. D+ props de pessoa
  //  serão adicionadas posteriormente.
  codigo!: number;
}

export class Categoria {
  // P/ enquanto só vamos criar a prop cód, p/ poder cadastrar lanc e categ associada. D+ props de categ
  //  serão adicionadas posteriormente.
  codigo!: number;
}

export class Lancamento {
  codigo!: number;
  descricao!: string;
  dataVencimento!: Date;
  dataPagamento!: Date;
/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Trocando os tps das datas de Date p/ str, p/ evitar o problema de incompatibilidades de formatos,
    ocorrido no método LancamentoService.adicionar(). */
  // dataVencimento!: string;
  // dataPagamento!: string;
  valor!: number;
  observacao!: string;
  tipo = "RECEITA";
  // Já istancia um obj da cls categ e o associa ao lanc
  categoria = new Categoria();
  // Já istancia um obj da cls pessoa e o associa ao lanc
  pessoa = new Pessoa();
/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Seguindo dicas neste post aqui https://app.algaworks.com/forum/topicos/82129/tipo-date , p/ tentar superar o
    erro gerando no p-calendar indicado aqui https://stackoverflow.com/questions/70017960/p-calendar-ngmodel-data-error-error-uncaught-in-promise-unexpected-l */
  static toJson(lanc: Lancamento): any {
    return {
      ...lanc,
      dataVencimento: DataService.dtParaStr(lanc.dataVencimento),
      dataPagamento: DataService.dtParaStr(lanc.dataPagamento)
    };
  }
}

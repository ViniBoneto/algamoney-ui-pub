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
  valor!: number;
  observacao!: string;
  tipo = "RECEITA";
  // Já istancia um obj da cls categ e o associa ao lanc
  categoria = new Categoria();
  // Já istancia um obj da cls pessoa e o associa ao lanc
  pessoa = new Pessoa();
}

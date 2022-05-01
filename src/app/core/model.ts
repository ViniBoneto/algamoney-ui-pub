import { DataService } from "../shared/data.service";

/* 17.19. Criando classes de modelo e usando no cadastro de lançamentos:
  Criando arq c/ def de clss de negócios (modelo) Lancamento, Categoria e Pessoa. Estas clss servem p/
  deixar o cód tipado e p/ os tps ficarem documentados. Servem tb p/ facilitar o controle, validação do
  cód e até o mapeamento de props p/ parte da IDE, em tempo de dev. */
export class Pessoa {
  // P/ enquanto só vamos criar a prop cód, p/ poder cadastrar lanc e pessoa associada. D+ props de pessoa
  //  serão adicionadas posteriormente.
  codigo!: number;
/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Adicionando campos faltantes no modelo de Pessoa. */
  nome!: string;
  ativo!: boolean;
  endereco!: Endereco | null;
/* 18.15. Desafio: roteamento e edição de pessoas:
    Os campos nº e cep, na view, ñ são input[type="text"], mas p-inputNumber e p-inputMask, respectivamente,
    q requerem um val do tp numérico e ñ um txt. P/ isto, alteraremos as props correspondentes a estes campos
    de str p/ nº. Tb criaremos uma func estática toJson(), similar ao de lanç, q irá converter as props correspondentes
    a estes campos de nº p/ str, antes de pessoa ser enviada ao backend. */
/*   static toJson(pessoa: Pessoa): any {
    return {
      ...pessoa,
      endereco: {
        ...pessoa.endereco,
        numero: pessoa.endereco?.numero.toString() ?? undefined,
        cep: pessoa.endereco?.cep.toString() ?? undefined
      }
    };
  } */
/* 18.15. Desafio: roteamento e edição de pessoas:
    Os campos nº e cep, na view, ñ são input[type="text"], mas p-inputNumber e p-inputMask, respectivamente,
    q requerem um val do tp numérico e ñ um txt. P/ isto, alteraremos as props correspondentes a estes campos
    de str p/ nº. Tb adicionaremos uma func estática fromJson(), q irá converter as props correspondentes a estes
    campos de str p/ nº, qdo pessoa for trazida do backend, eliminando de cep chars ñ numéricos (.-), caso existam. */
/*   static fromJson(pessoa: any): Pessoa {
    return {
      ...pessoa,
      endereco: {
        ...pessoa.endereco,
        numero: (pessoa.endereco?.numero) ? Number.parseInt( pessoa.endereco.numero.toString() ) : undefined,
        cep:  (pessoa.endereco?.cep) ? Number.parseInt( pessoa.endereco.cep.toString().replace(/\.|-/g, "" ) )
          : undefined
      }
    };
  } */
}

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Criando cls Endereco q comporá cls Pessoa. */
export class Endereco {
  logradouro!: string;
  numero!: string;
  complemento!: string;
  bairro!: string;
  cep!: string;
  cidade!: string;
  estado!: string;
/* 18.15. Desafio: roteamento e edição de pessoas:
    O campos nº e cep, na view, ñ são input[type="text"], mas p-inputNumber e p-inputMask, respectivamente,
    q requerem um val do tp numérico e ñ um txt. P/ isto, alteraremos as props correspondentes a estes campos
    de str p/ nº. */
  // numero!: number;
  // cep!: number;
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
  // dataPagamento!: Date;

  // 18.6. Desafio: implementando os serviços de atualização e busca por código:
  //   Adicionando possibilidade da prop dataPagamento poder ser nula.
  dataPagamento!: Date | null;
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
      dataPagamento: DataService.dtParaStr( (lanc.dataPagamento) ? lanc.dataPagamento : null )
    };
  }
}

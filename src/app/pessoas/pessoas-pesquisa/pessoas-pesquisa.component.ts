import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { PessoasGridComponent } from '../pessoas-grid/pessoas-grid.component';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    // 17.7. Desafio: criando a consulta e listagem de pessoas:
    //  Repetindo p/ o comp de pesquisa de pessoas o msm q foi feito p/ o de pesquisa de lançamentos (aulas 17.2-17.6).
/*     { nome: "Jacinto L. Aquino Rego", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Romeu Pinto", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Ava Berta", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Cuca Alves Beludo", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Botelho Soares Pinto", cidade: "Paraty", estado: "RJ", ativo: 1 },
    { nome: "Mila Amiuza", cidade: "Petrópolis", estado: "RJ", ativo: 0 },
    { nome: "Beijamin Argola", cidade: "Rio de Janeiro", estado: "RJ", ativo: 1 },
    { nome: "Laís C. Navarra", cidade: null, estado: null, ativo: 0 },
    { nome: "Major Tommas", cidade: "Washington", estado: "DC", ativo: 0 },
    { nome: "Patinhas McPato", cidade: "Patópolis", estado: null, ativo: 0 }
 */  ];

// 17.7. Desafio: criando a consulta e listagem de pessoas:
//  Repetindo p/ o comp de pesquisa de pessoas o msm q foi feito p/ o de pesquisa de lançamentos (aulas 17.2-17.6).
 filtro: PessoaFiltro = new PessoaFiltro();
 totRegs: number = 0;

/* 17.13. Desafio: implementando a exclusão de pessoas:
  Identifica o comp filho de grid de pessoas na view, usando o decorador @ViewChild, de modo análago ao
  q foi feito c/ lançamentos (aulas 17.8-17.10). */
  @ViewChild("gridPessoa") grid: PessoasGridComponent | undefined;

/* 17.7. Desafio: criando a consulta e listagem de pessoas:
  Comp de pesquisa de pessoas receberá um serv de pessoas por inj de depend (D.I.), em seu construtor.
  Este serv será usado p/ acessar as pessoas no backend. */
//  constructor(private pessoaServ: PessoaService) {}

/* 17.13. Desafio: implementando a exclusão de pessoas:
   Injeta no construtor servs de tratamento de erros, msgs e caixa de confirm. Como foi feito c/ comp de
   pesquisa de lançamentos (aulas 17.8-17.12). */
  constructor(
    private pessoaServ: PessoaService,
    private errServ: ErrorHandlerService,
    private msgServ: MessageService,
    private confirmServ: ConfirmationService,
    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas a def de título pág din, como feito p/ lançs na aula 18.12.
    private title: Title
  ) {}

  // Invoca a consulta de pessoas, no serviço, logo após a inicialização do comp, p/ carregar o comp
  //  grid filho.
  ngOnInit(): void {
    // Ñ há necessidade de se invocar o método this.pesquisar() aqui (vide comp lançamentos pesquisa).
    // this.pesquisar();

    // Teste método q busca tds as pessoas, s/ filtrar ou paginar
/*  this.pessoaServ.listar().then(
      (resp) => {
        console.log(resp);
    }); */

    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas a def de título pág din, como feito p/ lançs na aula 18.12.
    this.title.setTitle("Pesquisa pessoas");
  }

/* 17.7. Desafio: criando a consulta e listagem de pessoas:
  Pesquisa pessoas, usando paginação, buscando p/ uma determianda pág de consulta e, opcionalmente, filtrando-se
  p/ nome. */
  pesquisar(pagina: number = 0) {
    this.filtro.pagina = pagina;

    this.pessoaServ.pesquisar(this.filtro).then(
      (resp) => {
        // console.log(resp);

        this.pessoas = resp.pessoas;
        this.totRegs = resp.total;
    })
    /* 17.13. Desafio: implementando a exclusão de pessoas:
      De modo análogo ao q foi feito no comp de pesquisa de lancs, adiciona tratamento de erros à oper de pesquisa
      de pessoas, usando o serv de tratamento de erros p/ isto. */
    .catch(erro => this.errServ.handle(erro));
  }

  /* 17.13. Desafio: implementando a exclusão de pessoas:
    Cria um método p/ exclusão de pessoas, de modo análogo ao q foi feito c/ lançamentos (aulas 17.8-17.10)
    e, assim como c/ lançamentos, usa o serv de tratamento de erros (aula 17.12) p/ reportar erros de opers
    c/ pessoas. */
  excluir(pessoa: any) {
    this.pessoaServ.excluir(pessoa.codigo).then(() => {
    // Promise.resolve(pessoa.codigo).then(() => {
      console.log(`Excluída pessoa id ${pessoa.codigo}.`);

      if(this.grid)
        this.grid.atualizarGrid();

      this.msgServ.add({
          severity:'success',
          summary:'Pessoa excluída com sucesso!',
          detail:`Exclusão feita para pessoa id ${pessoa.codigo}.`
        });
      })
      .catch(erro => this.errServ.handle(erro));
  }

  // 17.13. Desafio: implementando a exclusão de pessoas:
  //   Cria um método p/ confirm antes da exclusão de pessoas, de modo análogo ao q foi feito c/ lancs (aulas 17.8-17.10).
  confirmarExclusao(pessoa: any) {
    this.confirmServ.confirm({
      message: "Tem certeza que deseja excluir a pessoa?",
      accept: () => this.excluir(pessoa)
    });
  }

/* 17.15. Desafio: implementando a mudança de status de pessoas:
  Vamos implementar o método q atualizará apenas o status de uma pessoa (de ativo p/ inativo ou vice-versa),
  invocando o serv de pessoa, q invocará o respectivo método na API de backend. */
  mudarStatus(pessoa: any) {
    let ativo: boolean;

    // Se pessoa for ativa, inativa e vice-versa.
    this.pessoaServ.mudarStatus(pessoa.codigo, ativo = !pessoa.ativo).then(() => {
      // Promise.resolve(pessoa.codigo).then(() => {
        console.log(`Status pessoa id ${pessoa.codigo} atualizado p/ ${ativo ? "ativo" : "inativo"}.`);

        // Atualiza grid pessoas p/ refletir novo status ativo pessoa
        // if(this.grid)
        //   this.grid.atualizarGrid();

/*      Em vez de se chamar o método de reinicialização do grid ( this.grid.atualizarGrid() ), foi feita
          apenas a atribuição abaixo. Isso faz com q, se a pessoa cujo status for atualizado estiver em alguma
          pág após a 1ª, o grid ñ volte p/ esta, saindo da pág em questão. Porém, a col relativa ao status da
          pessoa será atualizada p/ refletir seu novo status. Isto melhora a usabilidade. */
        pessoa.ativo = ativo;

        // Informa ao usr sucesso da opr
        this.msgServ.add({
            severity:'success',
            summary:'Status pessoa atualizado!',
            detail:`Pessoa ${ativo ? "ativada" : "desativada"} com sucesso.`
          });
        })
        // Tratar possíveis erros
        .catch(erro => this.errServ.handle(erro));
  }
}

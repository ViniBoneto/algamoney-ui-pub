import { Component, OnInit } from '@angular/core';

import { PessoaFiltro, PessoaService } from '../pessoa.service';

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

/* 17.7. Desafio: criando a consulta e listagem de pessoas:
  Comp de pesquisa de pessoas receberá um serv de pessoas por inj de depend (D.I.), em seu construtor.
  Este serv será usado p/ acessar as pessoas no backend. */
 constructor(private pessoaServ: PessoaService) {}

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
    });
  }
}

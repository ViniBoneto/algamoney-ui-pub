import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Lancamento } from './../../core/model';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  // 13.3. Adicionando botão de seleção:
  //   Vamos criar a prop tipos (um array de objs), p/ carregar as opts do SelectButton no template HTML.
  //   O comp SelectButton automaticamente exibirá as strs dos campos label, de cada obj, como rótulos das abas.
  tipos = [
    { label: "Receita", value: "RECEITA" },
    { label: "Despesa", value: "DESPESA" }
  ];

  // 13.4. Adicionando caixa de seleção (componente Dropdown):
  //   Comp PNG Dropdown tem um funcionamento mto semelhante ao SelecButton (botão de seleção). Array de categs
  //   será carregado no Dropdown de categs, de modo análogo ao array de tipos no SelectButton. Idem p/ o array
  //   de pessoas no Dropdown de pessoas.
/*   categorias = [
    { label: "Lazer", value: "1" },
    { label: "Alimentação", value: "2" },
    { label: "Supermercado", value: "3" },
    { label: "Farmácia", value: "4" },
    { label: "Outros", value: "5" }
  ]; */

/* 17.17. Listando as categorias cadastradas no dropdown:
    Esvaziando o array fixo de categs, usado no desenv da tela, pois, a partir de agora, o array q é fonte da combo
    de categs será dinamicamente carregada pelo serv de categs. */
  categorias = [];

/*   pessoas = [
    { label: "Jacinto L. Aquino Rego", value: "1" },
    { label: "Romeu Pinto", value: "2" },
    { label: "Ava Berta", value: "3" },
    { label: "Cuca Alves Beludo", value: "4" },
    { label: "Botelho Soares Pinto", value: "5" },
    { label: "Mila Amiuza", value: "6" },
    { label: "Beijamin Argola", value: "7" },
    { label: "Laís C. Navarra", value: "8" },
    { label: "Major Tommas", value: "9" },
    { label: "Patinhas McPato", value: "10" }
  ]; */

  // 17.18. Desafio: listando as pessoas cadastradas no dropdown
  //   Replica p/ pessoas o msm q foi feito p/ categs na aula anterior (17.17).
  pessoas = [];

/* 17.19. Criando classes de modelo e usando no cadastro de lançamentos:
    Criando uma prop representando o novo lançamento a ser cadastrado. Esta prop poderia ser do tp any ou um obj
    genérico. Mas, por boa prática, vamos implementar e associá-la à cls de negócios (modelo) Lancamento, até p/
    facilitar o controle, validação e o mapeamento de props p/ parte da IDE, em tempo de dev. Serve até p/ deixar
    o cód tipado e p/ os tps ficarem documentados. Esta e as d+ clss de negócio/modelo serão criadas dentro do mód
    Core. */
  lancamento = new Lancamento();

  constructor(
/* 17.17. Listando as categorias cadastradas no dropdown:
    Iremos injetar no comp de cadastro de lançamento o serv de categs, p/ preencher dinamicamente a combo desta
    e tb o serv de tratamento de erros, p/ tratar qq erro q venha a ocorrer. */
    private categServ: CategoriaService,
    private errHndServ: ErrorHandlerService,
    // 17.18. Desafio: listando as pessoas cadastradas no dropdown
    //   Replica p/ pessoas o msm q foi feito p/ categs na aula anterior (17.17).
    private pessoaServ: PessoaService
  ) { }

  ngOnInit(): void {
    // 17.17. Listando as categorias cadastradas no dropdown:
    //  Chama o método p/ carregar dinamicamente a combo de categs, logo após o comp ter suas props inicializadas.
    this.carregarCategs();
    // 17.18. Desafio: listando as pessoas cadastradas no dropdown
    //   Replica p/ pessoas o msm q foi feito p/ categs na aula anterior (17.17).
    this.carregarPessoas();
  }

/* 17.17. Listando as categorias cadastradas no dropdown:
    Acrescentamos um método p/ invocar o serv e carregar a combo de categs. Este método, no entanto, ñ poderá simplesmente
    atribuir diretamente o array de categs retornado pelo servidor à prop do comp (modelo da combobox). Isto pq os objs
    retornados pelo servidor têm as props nome e cód, enquanto a prop do combo tem objs c/ as props lbl e value, q é o formato
    aceito pelo p-dropdown e d+ comps semelhantes do PNG. Então, uma conversão ou mapeamento de arrays terá q ser feita. */
  carregarCategs(){
    // Como anteriormente explicado, ñ se pode simplesmente fazer "this.categorias = categs;". É preciso fazer um map.
    this.categServ.listar().then(categs => {
      // this.categorias = categs.map( (categ: any) => {
      //   return { label: categ.nome, value: categ.codigo };

      // Podemos tornar o cód acima (comentado) ainda + enxuto, rescrevendo-o da forma abaixo.
      //  Obs: Os () em torno dos {} são requeridos, p/ o compilador ñ pensar q se trata do corpo da func.
      this.categorias = categs.map( (categ: any) => ( { label: categ.nome, value: categ.codigo } ) );
    })
    // É preciso tb fazer um tratamento de erros
    .catch(erro => this.errHndServ.handle(erro));
  }

  // 17.18. Desafio: listando as pessoas cadastradas no dropdown
  //   Replica p/ pessoas o msm q foi feito p/ categs na aula anterior (17.17).
  carregarPessoas(){
    this.pessoaServ.listar().then(pessoas => {
      this.pessoas = pessoas.map( (pessoa: any) => ( { label: pessoa.nome, value: pessoa.codigo } ) );
    })
    .catch(erro => this.errHndServ.handle(erro));
  }

/* 17.19. Criando classes de modelo e usando no cadastro de lançamentos:
    Criando método p/ salvar um lançamento novo. O envio ao servidor será implementado noutra aula. Nesta
    será efetuada a implementação da cls de modelo (model) e o mapeamento (binding) entre as props da view
    e as props duma instância desta cls, representando o novo lançamento a ser cadastrado.

  Este método recebe como param o form de cadastro de lanc. Porém tds os vals dos seus cntrls já estarão
    mapeados p/ as props internas da prop lancamento. */
  salvar(lancForm: NgForm) {
    console.log("Salvando lançamento:\n", this.lancamento);
  }
}

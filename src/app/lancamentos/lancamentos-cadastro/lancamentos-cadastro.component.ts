import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';
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

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Cria um mecanismo p/ forçar q categs sejam carregadas 1º e q só se tente carregar pessoas após a concslusão de
    categs. */
  // categsCarregadas: boolean | undefined;

  constructor(
/* 17.17. Listando as categorias cadastradas no dropdown:
    Iremos injetar no comp de cadastro de lançamento o serv de categs, p/ preencher dinamicamente a combo desta
    e tb o serv de tratamento de erros, p/ tratar qq erro q venha a ocorrer. */
    private categServ: CategoriaService,
    private errHndServ: ErrorHandlerService,
    // 17.18. Desafio: listando as pessoas cadastradas no dropdown
    //   Replica p/ pessoas o msm q foi feito p/ categs na aula anterior (17.17).
    private pessoaServ: PessoaService,
/*  17.20. Implementando o serviço de cadastro de lançamentos:
      Injetando serv de lanç no comp, p/ fazer a inclusão do novo lanç e injetando tb o serv de msg do PNG, p/ exibir
      msg de retorno ao usr. */
    private lancServ: LancamentoService,
    private msgServ: MessageService,

/*  18.5. Recebendo parâmetros da rota:
      Injetamos no comp o serv ActivatedRoute q contém infos sobre a rota ativada p/ renderizar este comp, incluso seu
      caminho, estado, params, segmentos, config de rota, etc... */
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.categsCarregadas = false;

    // 17.17. Listando as categorias cadastradas no dropdown:
    //  Chama o método p/ carregar dinamicamente a combo de categs, logo após o comp ter suas props inicializadas.
    // this.carregarCategs();

    /* 17.20. Implementando o serviço de cadastro de lançamentos:
      Cria um mecanismo p/ forçar q categs sejam carregadas 1º e q só se tente carregar pessoas após a concslusão de
      categs. */
    // while( !this.categsCarregadas ) {
    //   console.log(`categsCarregadas === ${this.categsCarregadas}`);

/*  17.20. Implementando o serviço de cadastro de lançamentos:
      Mudança de estrat p/ implementar sinc e linearidade entre os carregamentos de categs e pessoas: Em vez de se
      usar uma var de sinc (categsCarregadas), usar-se-á o próprio mecanismo de Promises p/ fazer c/ q pessoas só
      sejam carregadas após conclusão de categs. */
    this.carregarCategs().then(() => {
      // 17.18. Desafio: listando as pessoas cadastradas no dropdown
      //   Replica p/ pessoas o msm q foi feito p/ categs na aula anterior (17.17).
      this.carregarPessoas();
  /*  18.5. Recebendo parâmetros da rota:
        Através das infos da rota ativada (ActivatedRoute) acessamos a prop snapshot, q é do tp ActivatedRouteSnapshot e
        corresponde a um snapshot (estado atual) da rota. Nesta, acessamos a prop params (do tp Params), q corresponde aos
        params matrizes (exclui aqueles da query) e seus vals neste snapshot da rota.

      Obs: Quando se carrega o comp pela rota "/lancamentos/novo" a prop params é um obj vazio, pois neste caso não há params
        na URL. */
      // console.log( this.route.snapshot.params );
      console.log( this.route.snapshot.params["codigo"] );

/*    18.6. Desafio: implementando os serviços de atualização e busca por código:
        Se for passado um cód válido na URL (isto é, algo dif de "/novo"), sabe-se q é p/ carregar o lanç correspondente, caso haja.
        Neste caso, farei uma chamada tst ao método do serv de lanç p/ buscá-lo. */
      let codLanc = this.route.snapshot.params["codigo"];

      if(codLanc) {
/*      18.6. Desafio: implementando os serviços de atualização e busca por código:
          Bota uma msg de confirm p/ só prosseguir a atualização tst se o usuário confirmar (clicar OK), pois a
          atualização estava acontecendo automaticamente no carreg da pág. */
        if( !confirm(`Continuar buscando e atualizando lançamento código\t${codLanc}?`) )
          return;

        console.log(`Buscando lançamento código\t${codLanc}...`);

        this.lancServ.buscar(codLanc).then((lanc) => {
          // console.log(`Lançamento buscado:\n${lanc}`);
          console.log(`Lançamento buscado:\n${JSON.stringify(lanc)}`);

          // Em adição, tb farei uma chamada tst ao método do serv de lanç p/ atualizar o lanç buscado.
          lanc.dataVencimento.setFullYear(lanc.dataVencimento.getFullYear() + 1); // Add 1 ano a dt venc

          if(lanc.dataPagamento) // Se válida, add 1 ano a dt pag
            lanc.dataPagamento.setFullYear(lanc.dataPagamento.getFullYear() + 1);
            // lanc.dataPagamento = null;

          lanc.valor += 150; // Add 150 R$ ao val
          // Add ao campo obs a str "Alterado {n}x programaticamente.", sendo n uma var incrementada
          //  a cada alt.
          let re = /Alterado\s(\d+)x\sprogramaticamente/;
          let n;

          if(lanc.observacao) {
            let match = lanc.observacao.match(re);
            // Incremente o nº de x de alts
            match && (n = parseInt(match[1]) + 1);
            // substitui a str c/ nº de alts atualizado
            lanc.observacao = lanc.observacao.replace(re,  `Alterado ${n}x programaticamente`);
          }
          else
            lanc.observacao = " >>> Alterado 1x programaticamente.";

          // Muda categ do lanç
          lanc.categoria.codigo = 1;
          // Muda pessoa do lanç
          lanc.pessoa.codigo = 17;

          // Faz atualização do lanç c/ os vals programaticamente alterados. Exibe lanç atualizado na console.
          this.lancServ.atualizar(lanc).then( (lanc) => console.log(`Lançamento atualizado c/ sucesso:\n${JSON.stringify(lanc)}`) )
            .catch( erro => this.errHndServ.handle(erro) );
        })
        .catch(erro => {
          this.errHndServ.handle(erro);
        });
      }
    } );
    // }
  }

/* 17.17. Listando as categorias cadastradas no dropdown:
    Acrescentamos um método p/ invocar o serv e carregar a combo de categs. Este método, no entanto, ñ poderá simplesmente
    atribuir diretamente o array de categs retornado pelo servidor à prop do comp (modelo da combobox). Isto pq os objs
    retornados pelo servidor têm as props nome e cód, enquanto a prop do combo tem objs c/ as props lbl e value, q é o formato
    aceito pelo p-dropdown e d+ comps semelhantes do PNG. Então, uma conversão ou mapeamento de arrays terá q ser feita. */
  carregarCategs(){
    // Como anteriormente explicado, ñ se pode simplesmente fazer "this.categorias = categs;". É preciso fazer um map.
    // this.categServ.listar().then(categs => {

      /* 17.20. Implementando o serviço de cadastro de lançamentos:
        Cria um mecanismo p/ forçar q categs sejam carregadas 1º e q só se tente carregar pessoas após a concslusão de
        categs. */
      // this.categsCarregadas = true;

/*  17.20. Implementando o serviço de cadastro de lançamentos:
      Mudança de estrat p/ implementar sinc e linearidade entre os carregamentos de categs e pessoas: Em vez de se
      usar uma var de sinc (categsCarregadas), usar-se-á o próprio mecanismo de Promises p/ fazer c/ q pessoas só
      sejam carregadas após conclusão de categs. */
    return this.categServ.listar().then(categs => {

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
    // console.log("Salvando lançamento:\n", this.lancamento);

/*  17.20. Implementando o serviço de cadastro de lançamentos:
      Vamos implementar a chamada ao serv de lanç, p/ cadastrar novo lanç no servidor. Ao completar o
      cadastro c/ sucesso, será exibida msg informativa ao usr (através do comp PNG toast). Em caso de
      erro, este será tratado c/ o serv de tratamento de erros. Tb resetamos o conteúdo do form e a prop
      lancamento, atribuindo-a a um novo obj. */
    this.lancServ.adicionar(this.lancamento).then(
      // Ñ iremos usar o lanç retornado no corpo de resp (o msm cadastrado), então podemos ignorar o param
      //  de entrada do hnd de tratamento de sucesso.
      () => {
        this.msgServ.add({
          severity:'success',
          summary:'Lançamento cadastrado!',
          detail: 'O lançamento foi adicionado com sucesso!'
        });

        lancForm.reset();
        this.lancamento = new Lancamento();
      }
    )
    .catch(erro => this.errHndServ.handle(erro));
  }
}
